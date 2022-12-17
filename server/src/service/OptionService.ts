import { DataSource, Repository } from "typeorm";
import Option from "../db/entity/Option";

class OptionService {
  private optionRepo: Repository<Option>;
  constructor(dataSource: DataSource) {
    this.optionRepo = dataSource.getRepository(Option);
  }

  getOptions = async () => {
    const options = await this.optionRepo.find();
    return options;
  };

  getTodayOptions = async (code: string) => {
    const options = await this.optionRepo.find({
      relations: {
        todayOptions: true,
      },
      where: {
        todayOptions: {
          code: {
            code,
          },
          date: new Date(),
        },
      },
    });
    return options;
  };
}

export default OptionService;
