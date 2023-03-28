import { DataSource, Repository } from "typeorm";
import CONFIG from "../config";
import AppUser from "../db/entity/AppUser";
import AuthService from "./AuthService";

class UserService {
  private userRepo: Repository<AppUser>;
  constructor(dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(AppUser);
  }

  getUser = async (id: number) => {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  };

  deleteUser = async (id: number, isDev: boolean) => {
    const user = await this.userRepo.findOneBy({ id });
    if (user) {
      if (user.appleRefreshToken) {
        const clientSecret = AuthService.signAppleClientSecret();
        const result = await fetch("https://appleid.apple.com/auth/revoke", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: isDev
              ? CONFIG.APPLE_BUNDLE_ID_DEV!
              : CONFIG.APPLE_BUNDLE_ID!,
            client_secret: clientSecret,
            token: user.appleRefreshToken,
            token_type_hint: "refresh_token",
          }),
        });
      }
      await this.userRepo.softRemove(user);
      return true;
    }
  };
}

export default UserService;
