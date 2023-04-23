import { AppDataSource } from "../db/data-source";
import AuthService from "./AuthService";
import CodeService from "./CodeService";
import HistoryService from "./HistoryService";
import NotificationService from "./NotificationService";
import OptionListService from "./OptionListService";
import OptionService from "./OptionService";
import TodayOptionService from "./TodayOptionService";
import UserService from "./UserService";
import VoteService from "./VoteService";

export const authService = new AuthService(AppDataSource);
export const userService = new UserService(AppDataSource);
export const codeService = new CodeService(AppDataSource);
export const notificationService = new NotificationService(AppDataSource);
export const optionService = new OptionService(AppDataSource);
export const todayOptionService = new TodayOptionService(
  AppDataSource,
  codeService
);
export const historyService = new HistoryService(AppDataSource, codeService);
export const optionListService = new OptionListService(AppDataSource);

export const voteService = new VoteService(
  AppDataSource,
  codeService,
  todayOptionService,
  historyService,
  notificationService
);
