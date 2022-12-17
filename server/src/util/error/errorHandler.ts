import { ErrorRequestHandler } from "express";
import AppError from "./AppError";

const errorHandler: ErrorRequestHandler = (err: AppError, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({ error: err.message || "Internal Server Error" });
};

export default errorHandler;
