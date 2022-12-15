import express from "express";
import { AppDataSource } from "./db/data-source";
import CONFIG from "./config";
import initializeDB from "./db/initializeDB";

const app = express();
const PORT = CONFIG.PORT;

initializeDB(AppDataSource)

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
