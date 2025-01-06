import { NextFunction, Request, Response } from "express";
import IQuiz, { IQuizInput } from "quiz";
import QuizService from "../Services/QuizService";

const getQuizzes = async (req: Request, res: Response<IQuiz[]>) => {
  const quizzes = await QuizService.getQuizzes();

  res.status(200).json(quizzes);
};

const getQuiz = async (
  req: Request,
  res: Response<IQuiz>,
  next: NextFunction
) => {
  const { quizId } = req.params;
  const quiz = await QuizService.getQuiz(quizId);

  if (!quiz) {
    return next();
  }

  res.status(200).json(quiz);
};

const postQuiz = async (req: Request, res: Response<IQuiz>) => {
  const { body } = req;

  const quizInput: IQuizInput = {
    title: body.title,
    questions: body.questions,
  };
  const quiz = await QuizService.createQuiz(quizInput);

  res.status(201).json(quiz);
};

const putQuiz = async (req: Request, res: Response<IQuiz>) => {
  const { quizId } = req.params;
  const { body } = req;

  const quizInput: IQuizInput = {
    title: body.title,
    questions: body.questions,
  };
  const quiz = await QuizService.updateQuiz(quizId, quizInput);

  res.status(200).json(quiz);
};

const deleteQuiz = async (req: Request, res: Response) => {
  const { quizId } = req.params;
  await QuizService.deleteQuiz(quizId);

  res.status(204).send();
};

export default { getQuizzes, getQuiz, postQuiz, putQuiz, deleteQuiz };
