import { RequestHandler } from "express";
import AuthService from "../service/AuthService";
import UserService from "../service/UserService";

class UserController {
  constructor(private userService: UserService) {}

  getMe: RequestHandler = async (req, res, next) => {
    const userId = req.user;
    if (userId) {
      const me = await this.userService.getUser(userId);
      if (me) {
        const token = AuthService.signUserToken(userId);
        return res.json({ ...me, token });
      }
    }
    return res.json();
  };

  deleteMe: RequestHandler = async (req, res, next) => {
    const userId = req.user;
    const { isDev } = req.query;
    if (userId) {
      await this.userService.deleteUser(userId, isDev === "true");
    }
    return res.json();
  };
}

export default UserController;
