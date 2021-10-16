import passport from "passport";
import { Router } from "express";
import { logout } from "../../controllers/auth.controller";

const router = Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/dashboard");
});

router.get("/auth/logout", logout);
//   app.post("/api/v1/auth/forgot-password", forgotPassword);
//   app.post("/api/v1/auth/reset-password", resetPassword);

export default router;
