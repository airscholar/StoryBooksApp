import { UserInterface } from "./src/models/User.model";

declare namespace Express {
  interface Request {
    user: UserInterface;
  }
}
