import {
  optionService,
  historyService,
  optionListService,
  authService,
  userService,
  codeService,
} from "../service";
import AuthController from "./AuthController";
import CodeController from "./CodeController";
import MainController from "./MainController";
import OptionListController from "./OptionListController";

export const authController = new AuthController(authService);
export const mainController = new MainController(
  userService,
  optionService,
  historyService
);
export const optionListController = new OptionListController(
  optionService,
  optionListService
);
export const codeController = new CodeController(
  codeService,
  optionService,
  optionListService
);
