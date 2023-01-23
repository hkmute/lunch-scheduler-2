import { RequestHandler } from "express";

const errorCatcher =
  (requestHandler: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default errorCatcher;
