import { RequestHandler, Request } from "express";
import AuthService from "../service/AuthService";

const retrieveUserId: RequestHandler = (req, res, next) => {
  if (req.headers.authorization) {
    const userId = AuthService.verifyUserToken(
      req.headers.authorization.replace("Bearer ", "")
    );
    req.user = userId;
  }
  next();
};

export default retrieveUserId;
