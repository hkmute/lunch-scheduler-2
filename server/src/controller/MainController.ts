import { RequestHandler } from "express";
import HistoryService from "../service/HistoryService";
import OptionService from "../service/OptionService";

class MainController {
  constructor(
    private optionService: OptionService,
    private historyService: HistoryService,
  ) {}

  getOptions: RequestHandler = async (req, res, next) => {
    try {
      const options = await this.optionService.getOptions();
      res.json(options);
    } catch (err) {
      next(err);
    }
  };

  getToday: RequestHandler = async (req, res, next) => {
    try {
      const { code } = req.params;
      const todayResult = await this.historyService.getTodayResult(code);
      if (todayResult) {
        return res.json(todayResult);
      }

      const todayOptions = await this.optionService.getTodayOptions(code);
      return res.json(todayOptions);
    } catch (err) {
      next(err);
    }
  };
}

export default MainController;
