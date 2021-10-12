// create express typescript server
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./src/config/config.env" });
import env from "./config/env.config";
// logger configuration
import logger from "./config/logger.config";
logger();
// load config
import winston from "winston";
import morgan, { StreamOptions } from "morgan";
import connectDB from "./config/db.config";
import exphbs from "express-handlebars";

const app = express();

connectDB();

const stream: StreamOptions = {
  write: message => winston.info(message),
};

if (env.isDev) {
  app.use(morgan("dev", { stream }));
}

app.engine(".hbs", exphbs({ defaultLayout: "mainLayout", extname: ".hbs" }));
app.set("view engine", ".hbs");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  winston.info(`Server started on port ${PORT} in ${env.NODE_ENV} mode`);
});
