import { NextFunction, Request, Response } from "express";
import ValidationError from "../errors/ValidationError";

const regex = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,50}$/;

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password || typeof password !== "string") {
    throw new ValidationError([
      {
        path: "password",
        message: "Password is required and has to be a string",
      },
    ]);
  }

  const isValid = regex.test(password);
  if (!isValid) {
    throw new ValidationError([
      {
        path: "password",
        message: "Invalid password",
      },
    ]);
  }

  next();
};

export default validatePassword;
