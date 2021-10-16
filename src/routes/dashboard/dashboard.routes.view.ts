import { Router } from "express";
import path from "path";

const router = Router();

// login/landing page loader
router.get("/", (req, res) => {
  res.render(path.join("auth", "loginView"), {
    title: "Login | StoryBook",
    layout: "loginLayout",
  });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard/dashboard", {
    title: "Dashboard",
    layout: "mainLayout",
  });
});

export default router;
