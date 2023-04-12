import { RequestHandler } from "express";
import OptionListService from "../service/OptionListService";
import OptionService from "../service/OptionService";
import { preprocessOptions, validateReq } from "../util/helpers";
class OptionListController {
  constructor(
    private optionService: OptionService,
    private optionListService: OptionListService
  ) {}

  getAllOptionLists: RequestHandler = async (req, res, next) => {
    const result = await this.optionListService.getAllOptionLists();
    return res.json(result);
  };

  createOptionList: RequestHandler = async (req, res, next) => {
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
    return res.json(result);
  };

  updateOptionList: RequestHandler = async (req, res, next) => {
    const userId = req.user!;
    const { id } = req.params;
    const { name, options } = req.body;
    const parsedId = Number.parseInt(id);
    validateReq("id", parsedId, "number");
    if (options) {
      validateReq("options", options, "array");
      const { optionsWithId, optionsToInsert } = preprocessOptions(options);
      const createdOptionsIds = await this.optionService.createOptions(
        optionsToInsert
      );
      const result = await this.optionListService.updateOptionList({
        id: parsedId,
        name,
        userId,
        options: [...optionsWithId, ...createdOptionsIds],
      });
      return res.json(result);
    }
    const result = await this.optionListService.updateOptionList({
      id: parsedId,
      name,
      userId,
    });
    return res.json(result);
  };

  removeOptionList: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const parsedId = Number.parseInt(id);
    validateReq("id", parsedId, "number");
    await this.optionListService.deleteOptionList(parsedId);
    return res.json();
  };
}

export default OptionListController;
