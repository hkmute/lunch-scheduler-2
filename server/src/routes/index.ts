import express from "express";
import MainController from "../controller/MainController";
import { AppDataSource } from "../db/data-source";
import HistoryService from "../service/HistoryService";
import OptionListService from "../service/OptionListService";
import OptionService from "../service/OptionService";

const router = express.Router();
const optionService = new OptionService(AppDataSource);
const historyService = new HistoryService(AppDataSource);
const optionListService = new OptionListService(AppDataSource);
const mainController = new MainController(
  optionService,
  historyService,
  optionListService
);

router.get("/options", mainController.getOptions);

router.get("/today/:code", mainController.getToday);

router.post("/option-list", mainController.createOptionList);

export default router;
