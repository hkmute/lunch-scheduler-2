import {
  optionService,
  historyService,
  optionListService,
  authService,
  userService,
  codeService,
  todayOptionService,
  voteService,
  notificationService,
} from "../service";
import AuthController from "./AuthController";
import CodeController from "./CodeController";
import MainController from "./MainController";
import NotificationController from "./NotificationController";
import OptionListController from "./OptionListController";
import UserController from "./UserController";

export const mainController = new MainController(
  optionService,
  todayOptionService,
  historyService,
  voteService
);
export const authController = new AuthController(authService);
export const userController = new UserController(userService);
export const notificationController = new NotificationController(
  notificationService
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
