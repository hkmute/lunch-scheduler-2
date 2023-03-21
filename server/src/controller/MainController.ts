import { RequestHandler } from "express";
import AuthService from "../service/AuthService";
import HistoryService from "../service/HistoryService";
import OptionService from "../service/OptionService";
import TodayOptionService from "../service/TodayOptionService";
import UserService from "../service/UserService";
import VoteService from "../service/VoteService";
import { getPaginationParams, validateReq } from "../util/helpers";

class MainController {
  constructor(
    private userService: UserService,
    private optionService: OptionService,
    private todayOptionService: TodayOptionService,
    private historyService: HistoryService,
    private voteService: VoteService
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
    
    const todayOptions = await this.todayOptionService.getTodayOptions(code);
    return res.json(todayOptions);
  };

  getHistoryByCode: RequestHandler = async (req, res) => {
    const { code } = req.params;
    const history = await this.historyService.getCodeHistory(
      code,
      getPaginationParams(req.query)
    );
    return res.json(history);
  };

  vote: RequestHandler = async (req, res) => {
    const { code, todayOptionId, voter } = req.body;
    validateReq("code", code, "string");
    validateReq("todayOptionId", todayOptionId, "number");
    validateReq("voter", voter, "string");
    this.voteService.vote(code, todayOptionId, voter);
    return res.json();
  };
}

export default MainController;
