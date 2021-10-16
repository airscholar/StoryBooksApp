import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/dashboard", authenticate, (req, res) => {
  res.render("dashboard/dashboard", {
    title: "Dashboard",
    layout: "mainLayout",
  });
});

export default router;
