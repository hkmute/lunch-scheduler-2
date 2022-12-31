import jwt, {
  JwtHeader,
  JwtPayload,
  SigningKeyCallback,
  VerifyOptions,
} from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Repository, DataSource } from "typeorm";
import CONFIG from "../config";
import AppUser from "../db/entity/AppUser";
import AppError from "../util/error/AppError";
import { newEntity } from "../util/helpers";

class AuthService {
  private appUserRepo: Repository<AppUser>;
  constructor(dataSource: DataSource) {
    this.appUserRepo = dataSource.getRepository(AppUser);
  }

  static getGoogleKey = (header: JwtHeader, callback: SigningKeyCallback) => {
    const client = jwksClient({
      jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
    });
    client.getSigningKey(header.kid, function (err, key) {
      callback(err, key?.getPublicKey());
    });
  };

  static verifyUserToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, CONFIG.USER_SECRET);
      console.log('decoded', decoded)
      if (typeof decoded === "object") {
        return decoded.id;
      }
      return false;
    } catch (err) {
      console.error(err.message);
      return false;
    }
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
            AuthService.getGoogleKey,
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

  appLogin = async (user: { username: string; displayName?: string }) => {
    const appUser = await this.appUserRepo.findOneBy({
      username: user.username,
    });
    if (!appUser) {
      return this.register(user);
    }
    const token = this.signUserToken(appUser.id);
    return {
      id: appUser.id,
      displayName: appUser.displayName,
      token,
    };
  };

  private register = async (user: {
    username: string;
    displayName?: string;
  }) => {
    const newAppUser = newEntity(AppUser, {
      username: user.username,
      displayName: user.displayName || user.username,
    });
    const result = await this.appUserRepo.save(newAppUser);
    const token = this.signUserToken(result.id);
    return {
      id: result.id,
      displayName: result.displayName,
      token,
    };
  };

  private signUserToken = (userId: number) => {
    const token = jwt.sign({ id: userId }, CONFIG.USER_SECRET, {
      expiresIn: "7d",
    });
    return token;
  };
}

export default AuthService;
