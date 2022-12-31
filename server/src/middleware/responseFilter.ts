import { RequestHandler } from "express";

const responseFilter: RequestHandler = (req, res, next) => {
  try {
    const oldJSON = res.json;
    res.json = (data) => {
      res.json = oldJSON;
      if (res.statusCode < 400) {
        return oldJSON.call(res, { success: true, data });
      }
      return oldJSON.call(res, data);
    };
    next();
  } catch (err) {
    next(err);
  }
};

export default responseFilter;
