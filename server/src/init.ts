import { AppDataSource } from "./db/data-source";
import initializeDB from "./db/initializeDB";
import { voteService } from "./service/index";

const init = async () => {
  await initializeDB(AppDataSource);
  voteService.initCron();
};

export default init;
