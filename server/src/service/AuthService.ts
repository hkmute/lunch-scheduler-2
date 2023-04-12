import jwt, {
  JwtHeader,
  JwtPayload,
  SigningKeyCallback,
  SignOptions,
  VerifyOptions,
} from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Repository, DataSource } from "typeorm";
import CONFIG from "../config";
import AppUser from "../db/entity/AppUser";
import AppError from "../util/error/AppError";
import { newEntity } from "../util/helpers";

type UserInfo = {
  username: string;
  email?: string;
  displayName?: string;
  authorizationCode?: string;
};
class AuthService {
  private appUserRepo: Repository<AppUser>;
  constructor(dataSource: DataSource) {
    this.appUserRepo = dataSource.getRepository(AppUser);
  }

  private static AUTH_PROVIDER_KEY_URI = Object.freeze({
    GOOGLE: "https://www.googleapis.com/oauth2/v3/certs",
    APPLE: "https://appleid.apple.com/auth/keys",
  });

  static getAuthProviderKey =
    (provider: keyof typeof AuthService.AUTH_PROVIDER_KEY_URI) =>
    (header: JwtHeader, callback: SigningKeyCallback) => {
      const client = jwksClient({
        jwksUri: this.AUTH_PROVIDER_KEY_URI[provider],
      });
      client.getSigningKey(header.kid, function (err, key) {
        callback(err, key?.getPublicKey());
      });
    };

  static verifyUserToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, CONFIG.USER_SECRET);
      if (typeof decoded === "object") {
        return decoded.id;
      }
      return false;
    } catch (err) {
      console.error(err.message);
      return false;
    }
  };

  static signUserToken = (userId: number) => {
    const token = jwt.sign({ id: userId }, CONFIG.USER_SECRET, {
      expiresIn: "7d",
    });
    return token;
  };

  static signAppleClientSecret = (isDev = false) => {
    const secret = Buffer.from(CONFIG.APPLE_SECRET!, "base64").toString(
      "ascii"
    );
    const signOptions: SignOptions = {
      algorithm: "ES256",
      keyid: CONFIG.APPLE_KEY_ID,
      expiresIn: "6m",
      issuer: CONFIG.APPLE_TEAM_ID,
      audience: "https://appleid.apple.com",
      subject: isDev ? CONFIG.APPLE_BUNDLE_ID_DEV : CONFIG.APPLE_BUNDLE_ID,
    };
    const clientSecret = jwt.sign({}, secret, signOptions);
    return clientSecret;
  };

  googleLogin = async (id_token: string) => {
    try {
      const verifyOptions: VerifyOptions = {
        algorithms: ["RS256"],
        issuer: ["https://accounts.google.com", "accounts.google.com"],
        audience: CONFIG.GUID,
      };
      const decoded = await new Promise<string | JwtPayload | undefined>(
        (resolve, reject) =>
          jwt.verify(
            id_token,
            AuthService.getAuthProviderKey("GOOGLE"),
            verifyOptions,
            (err, decoded) => {
              if (err) {
                return reject({ error: err.message });
              }
              return resolve(decoded);
            }
          )
      );
      if (typeof decoded === "object") {
        return {
          username: decoded.email as string,
          email: decoded.email as string,
          displayName: decoded.name as string,
        };
      }
      throw new Error("Unknown error");
    } catch (err) {
      if (err.error) {
        console.error(err.error);
        throw new AppError("Invalid token", 401);
      }
      throw err;
    }
  };

  appleLogin = async (identityToken: string, displayName: string) => {
    try {
      const verifyOptions: VerifyOptions = {
        algorithms: ["RS256"],
        issuer: ["https://appleid.apple.com", "appleid.apple.com"],
      };
      const decoded = await new Promise<string | JwtPayload | undefined>(
        (resolve, reject) =>
          jwt.verify(
            identityToken,
            AuthService.getAuthProviderKey("APPLE"),
            verifyOptions,
            (err, decoded) => {
              if (err) {
                return reject({ error: err.message });
              }
              return resolve(decoded);
            }
          )
      );
      if (typeof decoded === "object") {
        return {
          username: decoded.sub as string,
          email: decoded.email as string,
          displayName,
        };
      }
      throw new Error("Unknown error");
    } catch (err) {
      if (err.error) {
        console.error(err.error);
        throw new AppError("Invalid token", 401);
      }
      throw err;
    }
  };

  appLogin = async (user: UserInfo, isDev: boolean) => {
    const appUser = await this.appUserRepo.findOneBy({
      username: user.username,
    });
    if (!appUser) {
      return this.register(user, isDev);
    }
    const token = AuthService.signUserToken(appUser.id);
    return {
      id: appUser.id,
      displayName: appUser.displayName,
      token,
    };
  };

  private register = async (user: UserInfo, isDev: boolean) => {
    let appleRefreshToken: string | null = null;
    if (user.authorizationCode) {
      // apple user
      // generate apple client secret
      const clientSecret = AuthService.signAppleClientSecret(isDev);
      // generate and validate tokens
      const result = await fetch("https://appleid.apple.com/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: isDev
            ? CONFIG.APPLE_BUNDLE_ID_DEV!
            : CONFIG.APPLE_BUNDLE_ID!,
          client_secret: clientSecret,
          code: user.authorizationCode,
          grant_type: "authorization_code",
        }),
      });
      const resJson = await result.json();
      if (resJson.refresh_token) {
        appleRefreshToken = resJson.refresh_token;
      }
    }
    const newAppUser = newEntity(AppUser, {
      username: user.username,
      displayName: user.displayName || user.username,
      appleRefreshToken,
    });
    const result = await this.appUserRepo.save(newAppUser);
    const token = AuthService.signUserToken(result.id);
    return {
      id: result.id,
      displayName: result.displayName,
      token,
    };
  };
}

export default AuthService;
