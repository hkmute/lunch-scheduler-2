import { RequestHandler } from "express";
import AuthService from "../service/AuthService";
import AppError from "../util/error/AppError";

const guard: RequestHandler = (req, res, next) => {
  if (!req.user) {
    next(new AppError("Unauthorized", 401));
  }
  next();
};

export default guard;
