import { DataSource, Repository } from "typeorm";
import OptionList from "../db/entity/OptionList";
import Option from "../db/entity/Option";
import User from "../db/entity/AppUser";
import { newEntity } from "../util/helpers";

type CreateOptionListData = {
  name: string;
  ownerId: number;
  options: { id?: number; name: string }[];
};

type UpdateOptionListData = {
  id: number;
  name: string;
  options?: { id?: number; name: string }[];
};

class OptionListService {
  private optionListRepo: Repository<OptionList>;
  private optionRepo: Repository<Option>;

  constructor(dataSource: DataSource) {
    this.optionListRepo = dataSource.getRepository(OptionList);
    this.optionRepo = dataSource.getRepository(Option);
  }

  getAllOptionLists = async () => {
    const optionLists = await this.optionListRepo.find({
      relations: {
        options: true,
      },
      order: {
        id: "DESC",
      },
    });
    return optionLists;
  };

  getOptionListByCode = async (code: string) => {
    const optionList = await this.optionListRepo.findOne({
      where: {
        code: { code },
      },
    });
    return optionList;
  };

  createOptionList = async ({
    name,
    ownerId,
    options,
  }: CreateOptionListData) => {
    const owner = newEntity(User, { id: ownerId });
    const relatedOptions = options
      .filter((option) => option.id)
      .map((option) => newEntity(Option, option));
    const newOptionList = newEntity(OptionList, {
      name,
      // owner,
      options: relatedOptions,
    });
    const result = await this.optionListRepo.save(newOptionList);
    return result;
  };

  updateOptionList = async ({ id, name, options }: UpdateOptionListData) => {
    const relatedOptions = options
      ?.filter((option) => option.id)
      .map((option) => newEntity(Option, option));
    const newOptionList = newEntity(OptionList, {
      id,
      name,
      // owner,
      options: relatedOptions,
    });
    const result = await this.optionListRepo.save(newOptionList);
    return result;
  };

  deleteOptionList = async (id: number) => {
    const deleted = await this.optionListRepo.softDelete(id);
    return deleted.affected;
  };
}

export default OptionListService;
