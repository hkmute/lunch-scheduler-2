import { RequestHandler } from "express";
import AuthService from "../service/AuthService";
import { isProduction } from "../config";

const retrieveUserId: RequestHandler = (req, res, next) => {
  if (!isProduction && req.query.userId) {
    req.user = req.query.userId as any;
    return next();
  }
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
