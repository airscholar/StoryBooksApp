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
import path from "path";
import session from "express-session";
import authView from "./routes/auth/auth.routes.view";
import backendRoutes from "./routes/auth/auth.routes";
import mainViews from "./routes/dashboard/dashboard.routes.view";

const app = express();

connectDB();

const stream: StreamOptions = {
  write: message => winston.info(message),
};

// passport config
import passport from "./config/passport.config";

if (env.isDev) {
  app.use(morgan("dev", { stream }));
}
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({ defaultLayout: "mainLayout", extname: ".hbs" }));
app.set("view engine", ".hbs");

// passport middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
// login/landing page loader
app.get("/", (req, res) => {
  res.render(path.join("auth", "loginView"), {
    title: "Login | StoryBook",
    layout: "loginLayout",
  });
});

app.use("/", mainViews);
app.use("/auth", authView);
app.use("/api", backendRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  winston.info(`Server started on port ${PORT} in ${env.NODE_ENV} mode`);
});
