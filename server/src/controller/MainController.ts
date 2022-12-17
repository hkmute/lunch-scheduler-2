import { Request, Response } from "express";
import HistoryService from "../service/HistoryService";
import OptionListService from "../service/OptionListService";
import OptionService from "../service/OptionService";

class MainController {
  constructor(
    private optionService: OptionService,
    private historyService: HistoryService,
    private optionListService: OptionListService
  ) {}

  getOptions = async (req: Request, res: Response) => {
    const options = await this.optionService.getOptions();
    res.json({ data: options });
  };

  getToday = async (req: Request, res: Response) => {
    const { code } = req.params;
    const todayResult = await this.historyService.getTodayResult(code);
    if (todayResult) {
      return res.json({ data: todayResult });
    }

    const todayOptions = await this.optionService.getTodayOptions(code);
    return res.json({ data: todayOptions });
  };

  createOptionList = async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await this.optionListService.createOptionList({ name });
    return res.json({ data: result });
  };
}

export default MainController;
