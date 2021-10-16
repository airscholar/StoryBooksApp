import winston, { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import env from "./env.config";
// - Write all logs with level `error` and below to `error.log`
const errors = new DailyRotateFile({
  filename: path.join(`${env.LOG_DIR}`, "app", "error-%DATE%.log"),
  level: "error",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

// - Write all logs with level `info` and below to `combined.log`
const combined = new DailyRotateFile({
  filename: path.join(`${env.LOG_DIR}`, "app", "combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

export default function () {
  // handling uncaught exceptions so not things going wrong in express
  // e.g. during startup
  process.on("uncaughtException", (ex: { message: string; stack: string }) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  // handling rejections (promises) so ones missing the catch block
  process.on("unhandledRejection", (ex: { message: string; stack: string }) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  const logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: "ANP_AML" },
    transports: [errors, combined],
  });

  function errorReplacer(value: Error) {
    // console.log(value);
    if (value instanceof Error) {
      return value.stack;
    }
    return value;
  }

  // if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.prettyPrint(),
        format.splat(),
        format.printf(item => {
          item.label = "[app-server]";
          if (item.stack) return `${item.timestamp} ${item.level} ${item.label}: ${item.message} \n ${errorReplacer(item.stack)}`;
          return `${item.timestamp} ${item.level} ${item.label}: ${item.message}`;
        })
      ),
    })
  );
  // }
  winston.add(logger);
}
