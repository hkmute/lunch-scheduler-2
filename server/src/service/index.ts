import { AppDataSource } from "../db/data-source";
import AuthService from "./AuthService";
import CodeService from "./CodeService";
import HistoryService from "./HistoryService";
import OptionListService from "./OptionListService";
import OptionService from "./OptionService";
import UserService from "./UserService";

export const authService = new AuthService(AppDataSource);
export const userService = new UserService(AppDataSource);
export const codeService = new CodeService(AppDataSource);
export const optionService = new OptionService(AppDataSource);
export const historyService = new HistoryService(AppDataSource);
export const optionListService = new OptionListService(AppDataSource);
