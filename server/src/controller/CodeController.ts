import { RequestHandler } from "express";
import CodeService from "../service/CodeService";
import OptionListService from "../service/OptionListService";
import OptionService from "../service/OptionService";
import AppError from "../util/error/AppError";
import { preprocessOptions, sanitizeOwner, validateReq } from "../util/helpers";

class CodeController {
  constructor(
    private codeService: CodeService,
    private optionService: OptionService,
    private optionListService: OptionListService
  ) {}

  checkCodeExist: RequestHandler = async (req, res, next) => {
    const { code } = req.params;
    const result = await this.codeService.checkCodeExist(code);
    return res.json(result);
  };

  getCodeDetails: RequestHandler = async (req, res) => {
    const userId = req.user!;
    const { code } = req.params;
    const codeDetails = await this.codeService.getCodeDetails(code);
    if (!codeDetails) {
      throw new AppError("Code does not exist", 404);
    }

    return res.json(sanitizeOwner(codeDetails, userId));
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

  editCode: RequestHandler = async (req, res) => {
    const userId = req.user!;
    const { code } = req.params;
    const { name, options, allowGuestEdit } = req.body;
    validateReq("code", code, "string");
    validateReq("name", name, "string");
    validateReq("options", options, "array");
    if (allowGuestEdit !== undefined) {
      await this.codeService.updateCode(userId, code, {
        allowGuestEdit,
      });
    }
    const codeInfo = await this.codeService.getCode(code);
    const { optionsWithId, optionsToInsert } = preprocessOptions(options);
    const createdOptionsIds = await this.optionService.createOptions(
      optionsToInsert
    );
    await this.optionListService.updateOptionList({
      code,
      name,
      options: [...optionsWithId, ...createdOptionsIds],
      userId,
      allowGuestEdit: codeInfo?.allowGuestEdit,
    });
    return res.json();
  };
}

export default CodeController;
