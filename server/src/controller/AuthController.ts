import { RequestHandler } from "express";
import AuthService from "../service/AuthService";
import AppError from "../util/error/AppError";
import { validateReq } from "../util/helpers";

class AuthController {
  constructor(private authService: AuthService) {}

  login: RequestHandler = async (req, res, next) => {
    try {
      const { type, id_token, displayName } = req.body;
      if (type === "google") {
        validateReq("token", id_token, "string", (data) => !!data);
        const googleUser = await this.authService.googleLogin(id_token);
        const token = await this.authService.appLogin(googleUser);
        return res.json(token);
      }
      if (type === "apple") {
        validateReq("token", id_token, "string", (data) => !!data);
        const appleUser = await this.authService.appleLogin(
          id_token,
          displayName
        );
        const token = await this.authService.appLogin(appleUser);
        return res.json(token);
      }
      throw new AppError("Invalid login type", 400);
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
