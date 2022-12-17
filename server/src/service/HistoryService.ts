import { DataSource, Repository } from "typeorm";
import History from "../db/entity/History";

class MainService {
  private historyRepo: Repository<History>;
  constructor(dataSource: DataSource) {
    this.historyRepo = dataSource.getRepository(History);
  }

  getTodayResult = async (code: string) => {
    const todayResult = await this.historyRepo.findOneBy({
      code: { code },
      date: new Date(),
    });
    return todayResult;
  };
}

export default MainService;
