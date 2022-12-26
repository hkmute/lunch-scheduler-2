import express from "express";
import MainController from "../controller/MainController";
import OptionListController from "../controller/OptionListController";
import { AppDataSource } from "../db/data-source";
import HistoryService from "../service/HistoryService";
import OptionListService from "../service/OptionListService";
import OptionService from "../service/OptionService";

const router = express.Router();
const optionService = new OptionService(AppDataSource);
const historyService = new HistoryService(AppDataSource);
const optionListService = new OptionListService(AppDataSource);
const mainController = new MainController(optionService, historyService);
const optionListController = new OptionListController(
  optionService,
  optionListService
);

router.get("/options", mainController.getOptions);

router.get("/today/:code", mainController.getToday);

router.get("/option-list", optionListController.getAllOptionLists);
router.post("/option-list", optionListController.createOptionList);
router.put("/option-list/:id", optionListController.updateOptionList);
router.delete("/option-list/:id", optionListController.removeOptionList);

export default router;
