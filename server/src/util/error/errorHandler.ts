import { ErrorRequestHandler } from "express";
import AppError from "./AppError";

const errorHandler: ErrorRequestHandler = (err: AppError, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
    res.status(err.statusCode).json({ success: false, error: err.message });
  } else {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export default errorHandler;
