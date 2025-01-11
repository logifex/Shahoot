import { NextFunction, Request, Response } from "express";
import QuizService from "../services/QuizService";
import UnpermittedError from "../errors/UnpermittedError";

const verifyQuizAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quizId } = req.params;
  const user = req.user;
  if (!user) {
    throw new Error("No user");
  }

  const hasAccess = await QuizService.verifyQuizAccess(
    quizId,
    user._id.toString()
  );
  if (!hasAccess) {
    throw new UnpermittedError();
  }

  return next();
};

export default verifyQuizAccess;
