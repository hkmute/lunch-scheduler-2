import express from "express";
import rootRoutes from "./routes";
import errorHandler from "./util/error/errorHandler";
import middleware from "./middleware";
import CONFIG from "./config";
import init from "./init";

const app = express();
const PORT = CONFIG.PORT;

init();

app.use(...middleware);
app.use(rootRoutes);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
