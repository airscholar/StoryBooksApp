import { connect } from "mongoose";
import env from "./env.config";
import chalk from "chalk";
import winston from "winston";

const connectDB = async () => {
  try {
    const conn = await connect(env.MONGO_URI);

    winston.info(chalk.cyan.underline.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (err) {
    winston.error(err);
    process.exit(1);
  }
};

export default connectDB;
