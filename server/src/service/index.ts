import { AppDataSource } from "../db/data-source";
import AuthService from "./AuthService";
import HistoryService from "./HistoryService";
import OptionListService from "./OptionListService";
import OptionService from "./OptionService";

export const authService = new AuthService(AppDataSource);
export const optionService = new OptionService(AppDataSource);
export const historyService = new HistoryService(AppDataSource);
export const optionListService = new OptionListService(AppDataSource);
