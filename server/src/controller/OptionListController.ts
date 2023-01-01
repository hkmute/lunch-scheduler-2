import { RequestHandler } from "express";
import OptionListService from "../service/OptionListService";
import OptionService from "../service/OptionService";
import AppError from "../util/error/AppError";
import { validateReq } from "../util/helpers";

type Option = { id?: number; name: string };

class OptionListController {
  constructor(
    private optionService: OptionService,
    private optionListService: OptionListService
  ) {}

  getAllOptionLists: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.optionListService.getAllOptionLists();
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  createOptionList: RequestHandler = async (req, res, next) => {
    try {
      const { name, options } = req.body;
      validateReq("name", name, "string");
      validateReq("options", options, "array");
      const { optionsWithId, optionsToInsert } =
        this.preprocessOptions(options);
      const createdOptionsIds = await this.optionService.createOptions(
        optionsToInsert
      );
      const result = await this.optionListService.createOptionList({
        name,
        ownerId: 1,
        options: [...optionsWithId, ...createdOptionsIds],
      });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  updateOptionList: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, options } = req.body;
      const parsedId = Number.parseInt(id);
      validateReq("id", parsedId, "number");
      // TODO: check owner
      if (options) {
        const { optionsWithId, optionsToInsert } =
          this.preprocessOptions(options);
        const createdOptionsIds = await this.optionService.createOptions(
          optionsToInsert
        );
        const result = await this.optionListService.updateOptionList({
          id: parsedId,
          name,
          options: [...optionsWithId, ...createdOptionsIds],
        });
        return res.json({ data: result });
      }
      const result = await this.optionListService.updateOptionList({
        id: parsedId,
        name,
      });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  };

  removeOptionList: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const parsedId = Number.parseInt(id);
      validateReq("id", parsedId, "number");
      await this.optionListService.deleteOptionList(parsedId);
      return res.json();
    } catch (err) {
      next(err);
    }
  };

  preprocessOptions = (options: Option[]) => {
    const optionsWithId: Option[] = [];
    const optionsToInsert: Option[] = [];
    if (!options) {
      return { optionsWithId, optionsToInsert };
    }
    options.forEach((option) => {
      if (option.id) {
        return optionsWithId.push(option);
      }
      return optionsToInsert.push(option);
    });
    return { optionsWithId, optionsToInsert };
  };
}

export default OptionListController;
