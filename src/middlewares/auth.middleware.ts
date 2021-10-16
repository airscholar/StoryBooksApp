import { NextFunction, Request, Response } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

export const guestAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
};
