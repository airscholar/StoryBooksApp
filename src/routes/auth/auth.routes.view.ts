import path from "path";
import { Router } from "express";
const router = Router();

router.get("/register", (req, res) => {
  res.render(path.join("auth", "registerView"), {
    title: "Register | StoryBook",
    layout: "loginLayout",
  });
});
router.get("/forgotPassword", (req, res) => {
  res.render(path.join("auth", "forgotPasswordView"), {
    title: "Forgot Password | StoryBook",
    layout: "loginLayout",
  });
});

router.get("/resetPassword", (req, res) => {
  res.render(path.join("auth", "resetPasswordView"), {
    title: "Reset Password | StoryBook",
    layout: "loginLayout",
  });
});

export default router;
