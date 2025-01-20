import { Request, Response } from "express";
import QuizService from "../services/QuizService";
import IQuiz, { IQuizInput } from "../types/quiz";
import QuizNotFound from "../errors/QuizNotFound";

const getQuizzes = async (req: Request, res: Response<IQuiz[]>) => {
  const user = req.user;
  if (!user) {
    throw new Error("No user");
  }

  const quizzes = await QuizService.getQuizzes(user._id.toString());

  res.status(200).json(quizzes);
};

const getQuiz = async (req: Request, res: Response<IQuiz>) => {
  const { quizId } = req.params;
  const quiz = await QuizService.getQuiz(quizId);

  if (!quiz) {
    throw new QuizNotFound();
  }

  res.status(200).json(quiz);
};

const postQuiz = async (req: Request, res: Response<IQuiz>) => {
  const { title, questions } = req.body;

  const user = req.user;
  if (!user) {
    throw new Error("No user");
  }

  const quizInput: IQuizInput = {
    title: title,
    questions: questions,
  };
  const quiz = await QuizService.createQuiz(quizInput, user._id.toString());

  res.status(201).json(quiz);
};

const putQuiz = async (req: Request, res: Response<IQuiz>) => {
  const { quizId } = req.params;
  const { title, questions } = req.body;

  const quizInput: IQuizInput = {
    title: title,
    questions: questions,
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
