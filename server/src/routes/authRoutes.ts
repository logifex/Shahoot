import { Router } from "express";
import AuthController from "../controllers/AuthController";
import passport from "passport";
import validatePassword from "../middlewares/validatePassword";
import { emailLimiter, loginLimiter, registerLimiter } from "../config/limiter";

const router = Router();

router.post(
  "/register",
  validatePassword,
  registerLimiter,
  AuthController.postRegister
);

router.post(
  "/login",
  loginLimiter,
  passport.authenticate("local", { session: false }),
  AuthController.postLogin
);

router.post("/verify-email", AuthController.postVerifyEmail);

router.post(
  "/resend-verification-email",
  emailLimiter,
  AuthController.postResendVerificationEmail
);

router.post("/cancel-verification", AuthController.postCancelVerification);

export default router;
