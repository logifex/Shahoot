import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import UserExistsError from "../errors/UserExistsError";
import { loginLimiter } from "../config/limiter";

const postRegister = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const userExists = await AuthService.checkUserExists(email, username);
  if (userExists) {
    throw new UserExistsError();
  }

  await AuthService.register(email, username, password);

  res.status(201).send();
};

const postLogin = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new Error("No user");
  }

  loginLimiter.resetKey(req.body.username);

  const token = await AuthService.signAuthToken(user._id.toString());

  res.status(200).json({ token: token, user: user });
};

const postResendVerificationEmail = async (req: Request, res: Response) => {
  await AuthService.sendVerificationEmail(req.body.username);

  res.status(200).send();
};

const postVerifyEmail = async (req: Request, res: Response) => {
  try {
    await AuthService.verifyEmail(req.body.token);
  } catch (err) {
    res.status(401).send();
    return;
  }

  res.status(200).send();
};

const postCancelVerification = async (req: Request, res: Response) => {
  try {
    await AuthService.cancelVerification(req.body.token);
  } catch (err) {
    res.status(401).send();
    return;
  }

  res.status(204).send();
};

export default {
  postRegister,
  postLogin,
  postResendVerificationEmail,
  postVerifyEmail,
  postCancelVerification,
};
