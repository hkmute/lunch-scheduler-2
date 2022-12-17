import { RequestHandler } from "express";
import HistoryService from "../service/HistoryService";
import OptionListService from "../service/OptionListService";
import OptionService from "../service/OptionService";

class MainController {
  constructor(
    private optionService: OptionService,
    private historyService: HistoryService,
    private optionListService: OptionListService
  ) {}

  getOptions: RequestHandler = async (req, res, next) => {
    try {
      const options = await this.optionService.getOptions();
      res.json({ data: options });
    } catch (err) {
      next(err);
    }
  };

  getToday: RequestHandler = async (req, res, next) => {
    try {
      const { code } = req.params;
      const todayResult = await this.historyService.getTodayResult(code);
      if (todayResult) {
        return res.json({ data: todayResult });
      }

      const todayOptions = await this.optionService.getTodayOptions(code);
      return res.json({ data: todayOptions });
    } catch (err) {
      next(err);
    }
  };

  createOptionList: RequestHandler = async (req, res, next) => {
    try {
      const { name } = req.body;
      const result = await this.optionListService.createOptionList({ name });
      return res.json({ data: result });
    } catch (err) {
      next(err);
    }
  };
}

export default MainController;
