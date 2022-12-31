import express from "express";
import {
  authController,
  mainController,
  optionListController,
} from "../controller";

const router = express.Router();

router.post("/login", authController.login);

router.get("/options", mainController.getOptions);

router.get("/today/:code", mainController.getToday);

router.get("/option-list", optionListController.getAllOptionLists);
router.post("/option-list", optionListController.createOptionList);
router.put("/option-list/:id", optionListController.updateOptionList);
router.delete("/option-list/:id", optionListController.removeOptionList);

export default router;
