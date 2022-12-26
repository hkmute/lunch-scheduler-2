import express from "express";
import { AppDataSource } from "./db/data-source";
import CONFIG from "./config";
import initializeDB from "./db/initializeDB";
import rootRoutes from "./routes";
import errorHandler from "./util/error/errorHandler";
import middleware from "./middleware";

const app = express();
const PORT = CONFIG.PORT;

initializeDB(AppDataSource);

app.use(...middleware);
app.use(rootRoutes);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
