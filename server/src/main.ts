import express from "express";
import { AppDataSource } from "./db/data-source";
import CONFIG from "./config";
import initializeDB from "./db/initializeDB";
import rootRoutes from "./routes";

const app = express();
const PORT = CONFIG.PORT;

initializeDB(AppDataSource);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rootRoutes);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
