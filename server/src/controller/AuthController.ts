import { RequestHandler } from "express";
import AuthService from "../service/AuthService";
import AppError from "../util/error/AppError";
import { validateReq } from "../util/helpers";

class AuthController {
  constructor(private authService: AuthService) {}

  login: RequestHandler = async (req, res, next) => {
    const { type, id_token, displayName, isDev } = req.body;
    if (type === "google") {
      validateReq("token", id_token, "string", (data) => !!data);
      const googleUser = await this.authService.googleLogin(id_token);
      const token = await this.authService.appLogin(googleUser, isDev);
      return res.json(token);
    }
    if (type === "apple") {
      const { authorizationCode } = req.body;
      validateReq("token", id_token, "string", (data) => !!data);
      const appleUser = await this.authService.appleLogin(
        id_token,
        displayName
      );
      const token = await this.authService.appLogin(
        {
          ...appleUser,
          authorizationCode,
        },
        isDev
      );
      return res.json(token);
    }
    throw new AppError("Invalid login type", 400);
  };
}

export default AuthController;
