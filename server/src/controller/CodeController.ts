import { RequestHandler } from "express";
import CodeService from "../service/CodeService";
import OptionListService from "../service/OptionListService";
import OptionService from "../service/OptionService";
import { preprocessOptions, validateReq } from "../util/helpers";

class CodeController {
  constructor(
    private codeService: CodeService,
    private optionService: OptionService,
    private optionListService: OptionListService
  ) {}

  checkCodeExist: RequestHandler = async (req, res, next) => {
    const { code } = req.params;
    const isExist = await this.codeService.checkCodeExist(code);
    return res.json({ isExist });
  };

  createCode: RequestHandler = async (req, res) => {
    const userId = req.user!;
    const { name, options } = req.body;
    validateReq("name", name, "string");
    validateReq("options", options, "array");
    const { optionsWithId, optionsToInsert } = preprocessOptions(options);
    const createdOptionsIds = await this.optionService.createOptions(
      optionsToInsert
    );
    const result = await this.optionListService.createOptionList({
      name,
      ownerId: userId,
      options: [...optionsWithId, ...createdOptionsIds],
    });
    const { code } = await this.codeService.createCode(result.id, userId);
    return res.json({ code });
  };
}

export default CodeController;
