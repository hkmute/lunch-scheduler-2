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

  createOptions = async (options: { name: string }[]) => {
    if (!options.length) {
      return [];
    }
    await this.optionRepo
      .createQueryBuilder()
      .insert()
      .values(options)
      .orIgnore()
      .execute();
    const optionsList = await this.optionRepo.findBy(
      options.map(({ name }) => ({ name }))
    );
    return optionsList;
  };
}

export default OptionService;
