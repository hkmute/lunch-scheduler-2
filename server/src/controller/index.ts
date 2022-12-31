import {
  optionService,
  historyService,
  optionListService,
  authService,
} from "../service";
import AuthController from "./AuthController";
import MainController from "./MainController";
import OptionListController from "./OptionListController";

export const authController = new AuthController(authService);
export const mainController = new MainController(optionService, historyService);
export const optionListController = new OptionListController(
  optionService,
  optionListService
);
