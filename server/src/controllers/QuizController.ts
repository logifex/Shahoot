import { Request, Response } from "express";
import Quiz from "../models/Quiz";
import { HydratedDocument } from "mongoose";
import IQuiz from "quiz";

const getQuizzes = async (
  req: Request,
  res: Response<HydratedDocument<IQuiz>[]>
) => {
  const quizzes = await Quiz.find();

  res.status(200).json(quizzes);
};

const getQuiz = async (
  req: Request,
  res: Response<HydratedDocument<IQuiz>>
) => {
  const { quizId } = req.params;
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404).send();
    return;
  }

  res.status(200).json(quiz);
};

const postQuiz = async (
  req: Request,
  res: Response<HydratedDocument<IQuiz>>
) => {
  const { body } = req;

  const quiz = await Quiz.create(body);

  res.status(201).json(quiz);
};

export default { getQuizzes, getQuiz, postQuiz };
