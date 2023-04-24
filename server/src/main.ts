import express from "express";
import path from "path";
import * as Sentry from "@sentry/node";
import rootRoutes from "./routes";
import errorHandler from "./util/error/errorHandler";
import middleware from "./middleware";
import CONFIG from "./config";
import init from "./init";

const app = express();
const PORT = CONFIG.PORT;

init(app);

app.use(...middleware);
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(rootRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.use((req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
