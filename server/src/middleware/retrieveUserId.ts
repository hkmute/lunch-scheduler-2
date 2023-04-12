import { RequestHandler, Request } from "express";
import AuthService from "../service/AuthService";

const retrieveUserId: RequestHandler = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const userId = AuthService.verifyUserToken(
        req.headers.authorization.split("Bearer ")[1]
      );
      req.user = userId;
    } catch (err) {
      console.error(
        `Unable to retrieve user id from token. Reason: ${err.message}`
      );
    }
  }
  next();
};

export default retrieveUserId;
