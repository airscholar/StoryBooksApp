import { cleanEnv, num, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  MONGO_URI: str({ default: "mongodb://localhost:27017/StoryBook" }),
  NODE_ENV: str({ default: "development" }),
  LOG_DIR: str({ default: "logs" }),
  GOOGLE_CLIENT_ID: str({ default: "abc" }),
  GOOGLE_CLIENT_SECRET: str({ default: "abc" }),
  GOOGLE_CALLBACK_URL: str({ default: "abc" }),
  JWT_SECRET: str({ default: "abc" }),
});

export default env;
