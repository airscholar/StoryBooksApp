// import { UserInterface } from "./../models/User.model";
import { NextFunction, Request, Response } from "express";
// import UserModel from "../models/User.model";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  // req.user = new UserModel(req.user);
  next();
};

export const guestAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    // req.user = new UserModel(req.user);
    return res.redirect("/dashboard");
  }

  next();
};
