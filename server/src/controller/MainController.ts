import { RequestHandler } from "express";
import AuthService from "../service/AuthService";
import CodeService from "../service/CodeService";
import HistoryService from "../service/HistoryService";
import OptionService from "../service/OptionService";
import UserService from "../service/UserService";

class MainController {
  constructor(
    private userService: UserService,
    private optionService: OptionService,
    private historyService: HistoryService
  ) {}

  getMe: RequestHandler = async (req, res, next) => {
    const userId = req.user;
    if (userId) {
      const me = await this.userService.getUser(userId);
      if (me) {
        const token = AuthService.signUserToken(userId);
        return res.json({ ...me, token });
      }
    }
    return res.json();
  };

  getOptions: RequestHandler = async (req, res, next) => {
    const options = await this.optionService.getOptions();
    res.json(options);
  };

  getToday: RequestHandler = async (req, res, next) => {
    const { code } = req.params;
    const todayResult = await this.historyService.getTodayResult(code);
    if (todayResult) {
      return res.json(todayResult);
    }

    const todayOptions = await this.optionService.getTodayOptions(code);
    return res.json(todayOptions);
  };
}

export default MainController;
