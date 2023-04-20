import { addHours, startOfDay } from "date-fns";
import { Repository, DataSource } from "typeorm";
import Option from "../db/entity/Option";
import TodayOption from "../db/entity/TodayOption";
import { getStartOfHKTDay, newEntity } from "../util/helpers";
import CodeService from "./CodeService";

class TodayOptionService {
  private todayOptionRepo: Repository<TodayOption>;
  constructor(dataSource: DataSource, private codeService: CodeService) {
    this.todayOptionRepo = dataSource.getRepository(TodayOption);
  }

  getTodayOptions = async (code: string) => {
    const options = await this.todayOptionRepo.find({
      relations: {
        option: true,
        votes: true,
      },
      where: {
        code: {
          code,
        },
        date: getStartOfHKTDay(),
      },
    });
    return options;
  };

  createTodayOptions = async (code: string, options: Option[]) => {
    const codeEntity = await this.codeService.getCode(code);
    const newTodayOptions = options.map((option) =>
      newEntity(TodayOption, {
        date: getStartOfHKTDay(),
        code: codeEntity,
        option,
      })
    );
    await this.todayOptionRepo.save(newTodayOptions);
    return true;
  };
}

export default TodayOptionService;
