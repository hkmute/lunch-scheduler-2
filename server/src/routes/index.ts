import express from "express";
import {
  authController,
  mainController,
  optionListController,
  codeController,
  userController,
  notificationController,
} from "../controller";
import guard from "../middleware/guard";
import errorCatcher from "../util/error/errorCatcher";

const router = express.Router();

router.post("/login", errorCatcher(authController.login));
router.get("/me", guard, errorCatcher(userController.getMe));
router.delete("/me", guard, errorCatcher(userController.deleteMe));

router.get("/me/code", guard, errorCatcher(userController.getMyCode));

router.get("/code/:code", errorCatcher(codeController.getCodeDetails));
router.post("/code", errorCatcher(codeController.createCode));
router.put("/code/:code", errorCatcher(codeController.editCode));
router.get("/code/:code/exist", errorCatcher(codeController.checkCodeExist));

router.post(
  "/notification/token",
  errorCatcher(notificationController.updatePushToken)
);

router.put(
  "/notification/token/code",
  errorCatcher(notificationController.updatePushTokenCode)
);

router.get("/options", errorCatcher(mainController.getOptions));

router.get("/today/:code", errorCatcher(mainController.getToday));

router.post("/vote", errorCatcher(mainController.vote));
router.delete("/vote/:id", errorCatcher(mainController.unvote));

router.get("/history/:code", errorCatcher(mainController.getHistoryByCode));

router.get(
  "/option-list",
  errorCatcher(optionListController.getAllOptionLists)
);
router.post(
  "/option-list",
  errorCatcher(optionListController.createOptionList)
);
router.put(
  "/option-list/:id",
  errorCatcher(optionListController.updateOptionList)
);
router.delete(
  "/option-list/:id",
  errorCatcher(optionListController.removeOptionList)
);

export default router;
