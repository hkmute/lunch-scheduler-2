import { RequestHandler } from "express";
import HistoryService from "../service/HistoryService";
import OptionService from "../service/OptionService";
import TodayOptionService from "../service/TodayOptionService";
import VoteService from "../service/VoteService";
import { getPaginationParams, validateReq } from "../util/helpers";

class MainController {
  constructor(
    private optionService: OptionService,
    private todayOptionService: TodayOptionService,
    private historyService: HistoryService,
    private voteService: VoteService
  ) {}

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
    const { code, todayOptionId, voter, type } = req.body;
    validateReq("code", code, "string");
    validateReq("todayOptionId", todayOptionId, "number");
    validateReq("voter", voter, "string");
    await this.voteService.vote(code, todayOptionId, voter, type);
    return res.json();
  };

  unvote: RequestHandler = async (req, res) => {
    const { id } = req.params;
    validateReq("id", id, "number");
    await this.voteService.deleteVote(id);
    return res.json();
  };
}

export default MainController;
