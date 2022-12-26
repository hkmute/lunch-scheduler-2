import express, { RequestHandler } from "express";
import responseFilter from "./responseFilter";

const middleware: RequestHandler[] = [
  express.json(),
  express.urlencoded({ extended: true }),
  responseFilter,
];

export default middleware;
