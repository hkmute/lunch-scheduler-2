import { DataSource, Repository } from "typeorm";
import OptionList from "../db/entity/OptionList";
import Option from "../db/entity/Option";
import AppUser from "../db/entity/AppUser";
import { newEntity } from "../util/helpers";
import AppError from "../util/error/AppError";

type CreateOptionListData = {
  name: string;
  ownerId: number;
  options: { id?: number; name: string }[];
};

type UpdateOptionListData = {
  id?: number;
  code?: string;
  name: string;
  options?: { id?: number; name: string }[];
  userId: number;
  allowGuestEdit?: boolean;
};

class OptionListService {
  private optionListRepo: Repository<OptionList>;

  constructor(dataSource: DataSource) {
    this.optionListRepo = dataSource.getRepository(OptionList);
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
    const owner = newEntity(AppUser, { id: ownerId });
    const relatedOptions = options
      .filter((option) => option.id)
      .map((option) => newEntity(Option, option));
    const newOptionList = newEntity(OptionList, {
      name,
      owner,
      options: relatedOptions,
    });
    const result = await this.optionListRepo.save(newOptionList);
    return result;
  };

  updateOptionList = async ({
    id,
    code,
    name,
    options,
    userId,
    allowGuestEdit,
  }: UpdateOptionListData) => {
    if (!id && !code) {
      throw new AppError("Invalid id", 404);
    }
    const relatedOptions = options
      ?.filter((option) => option.id)
      .map((option) => newEntity(Option, option));

    // https://github.com/typeorm/typeorm/issues/8404
    // const updatedOptionList = newEntity(OptionList, {
    //   name,
    //   options: relatedOptions,
    // });
    // const result = await this.optionListRepo.update(
    //   {
    //     code: { code },
    //     owner: {
    //       id: userId,
    //     },
    //   },
    //   updatedOptionList
    // );
    const optionListToUpdate = await this.optionListRepo.findOneBy({
      id,
      code: code ? { code } : undefined,
      owner: allowGuestEdit
        ? undefined
        : {
            id: userId,
          },
    });
    if (!optionListToUpdate) {
      return false;
    }
    Object.assign(optionListToUpdate, {
      name,
      options: relatedOptions,
    });
    const result = await this.optionListRepo.save(optionListToUpdate);
    return result;
  };

  deleteOptionList = async (id: number) => {
    const deleted = await this.optionListRepo.softDelete(id);
    return deleted.affected;
  };
}

export default OptionListService;
