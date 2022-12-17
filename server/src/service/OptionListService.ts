import { DataSource, Repository } from "typeorm";
import OptionList from "../db/entity/OptionList";
import User from "../db/entity/User";
import { newEntity } from "../util/helpers";

type CreateOptionListData = {
  name: string;
  ownerId?: string;
};

class OptionListService {
  private optionListRepo: Repository<OptionList>;
  constructor(dataSource: DataSource) {
    this.optionListRepo = dataSource.getRepository(OptionList);
  }

  getOptionListByCode = async (code: string) => {
    const optionList = await this.optionListRepo.findOne({
      where: {
        code: { code },
      },
    });
    return optionList;
  };

  createOptionList = async ({ name, ownerId }: CreateOptionListData) => {
    const owner = newEntity(User, { id: ownerId });
    const newOptionList = newEntity(OptionList, { name, owner });
    const result = this.optionListRepo.create(newOptionList);
    return result;
  };
}

export default OptionListService;
