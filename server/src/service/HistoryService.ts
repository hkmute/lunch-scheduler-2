import { startOfDay } from "date-fns";
import { DataSource, Repository } from "typeorm";
import History from "../db/entity/History";
import { newEntity } from "../util/helpers";
import CodeService from "./CodeService";

class HistoryService {
  private historyRepo: Repository<History>;
  constructor(dataSource: DataSource, private codeService: CodeService) {
    this.historyRepo = dataSource.getRepository(History);
  }

  getTodayResult = async (code: string) => {
    const todayResult = await this.historyRepo.findOne({
      where: {
        code: { code },
      },
      relations: {
        option: true,
      },
      order: {
        date: "DESC",
      },
    });
    return todayResult;
  };

  getCodeHistory = async (
    code: string,
    params: { limit: number; offset: number }
  ) => {
    const history = await this.historyRepo.findAndCount({
      relations: {
        option: true,
      },
      where: {
        code: { code },
      },
      order: {
        date: "DESC",
      },
      take: params.limit,
      skip: params.offset,
    });
    return {
      data: history[0],
      totalCount: history[1],
      limit: params.limit,
      offset: params.offset,
    };
  };

  createCodeHistory = async (code: string, optionId: number) => {
    const codeEntity = await this.codeService.getCode(code);
    if (code && optionId) {
      const newHistory = newEntity(History, {
        date: startOfDay(new Date()),
        code: codeEntity,
        option: optionId,
      });
      const result = await this.historyRepo.save(newHistory);
      return result;
    }
    return false;
  };
}

export default HistoryService;
