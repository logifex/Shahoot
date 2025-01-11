import { Router } from "express";
import AuthController from "../controllers/AuthController";
import passport from "passport";
import validatePassword from "../middlewares/validatePassword";

const router = Router();

router.post("/register", validatePassword, AuthController.postRegister);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  AuthController.postLogin
);

router.post("/verify-email", AuthController.postVerifyEmail);

router.post(
  "/resend-verification-email",
  AuthController.postResendVerificationEmail
);

router.post("/cancel-verification", AuthController.postCancelVerification);

export default router;
