import { AppDataSource } from "./db/data-source";
import initializeDB from "./db/initializeDB";
import { voteService } from "./service/index";
import type { Express } from "express";
import sentry from "./util/sentry";

const init = async (app: Express) => {
  sentry.init(app);
  await initializeDB(AppDataSource);
  voteService.initCron();
};

export default init;
