import express from "express";
import {
  authController,
  mainController,
  optionListController,
  codeController,
} from "../controller";
import guard from "../middleware/guard";
import errorCatcher from "../util/error/errorCatcher";

const router = express.Router();

router.get("/me", guard, errorCatcher(mainController.getMe));
router.post("/login", errorCatcher(authController.login));

router.post("/code", errorCatcher(codeController.createCode));
router.get("/code/:code/exist", errorCatcher(codeController.checkCodeExist));

router.get("/options", errorCatcher(mainController.getOptions));

router.get("/today/:code", errorCatcher(mainController.getToday));

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
