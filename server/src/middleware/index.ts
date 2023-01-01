import express, { RequestHandler } from "express";
import responseFilter from "./responseFilter";
import retrieveUserId from "./retrieveUserId";

const middleware: RequestHandler[] = [
  express.json(),
  express.urlencoded({ extended: true }),
  retrieveUserId,
  responseFilter,
];

export default middleware;
