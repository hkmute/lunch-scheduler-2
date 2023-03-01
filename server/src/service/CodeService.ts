import { DataSource, FindManyOptions, Repository } from "typeorm";
import Code from "../db/entity/Code";
import { newEntity } from "../util/helpers";

class CodeService {
  private codeRepo: Repository<Code>;
  constructor(dataSource: DataSource) {
    this.codeRepo = dataSource.getRepository(Code);
  }

  checkCodeExist = async (code: string) => {
    const result = await this.codeRepo.findOneBy({
      code,
    });
    return { isExist: !!result, optionListName: result?.optionList.name };
  };

  getCode = async (code: string) => {
    const codeInfo = await this.codeRepo.findOneBy({ code });
    return codeInfo;
  };

  getCodeDetails = async (code: string) => {
    const codeDetails = await this.codeRepo.findOne({
      where: {
        code,
      },
      relations: {
        owner: true,
        optionList: {
          options: true,
        },
      },
    });
    return codeDetails;
  };

  getAllCode = async (options?: FindManyOptions<Code>) => {
    const allCode = await this.codeRepo.find(options);
    return allCode;
  };

  getAllCodeDetails = async () => {
    const allCodeDetails = await this.codeRepo.find({
      relations: {
        optionList: {
          options: true,
        },
      },
    });
    return allCodeDetails;
  };

  createCode = async (
    optionListId: number,
    ownerId: number,
    retried: number = 0
  ): Promise<{ id: number; code: string }> => {
    const { nanoid } = await import("nanoid");
    const code = nanoid(12);
    const isExist = await this.checkCodeExist(code);
    if (isExist) {
      console.error("Code already exists. Create code again.");
      if (retried < 5) {
        return this.createCode(optionListId, ownerId, retried + 1);
      } else {
        console.error("Code already exists. Create code again.");
        throw new Error();
      }
    }
    const codeEntity = newEntity(Code, {
      owner: ownerId,
      optionList: optionListId,
      code,
    });
    const result = await this.codeRepo
      .createQueryBuilder()
      .insert()
      .values(codeEntity)
      .execute();
    return { id: result.identifiers[0].id, code };
  };
}

export default CodeService;
