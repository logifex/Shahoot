import { Request, Response } from "express";
import IQuiz from "quiz";
import QuizService from "../Services/QuizService";

const getQuizzes = async (req: Request, res: Response<IQuiz[]>) => {
  const quizzes = await QuizService.getQuizzes();

  res.status(200).json(quizzes);
};

const getQuiz = async (req: Request, res: Response<IQuiz>) => {
  const { quizId } = req.params;
  const quiz = await QuizService.getQuiz(quizId);

  if (!quiz) {
    res.status(404).send();
    return;
  }

  res.status(200).json(quiz);
};

const postQuiz = async (req: Request, res: Response<IQuiz>) => {
  const { body } = req;
  const quiz = await QuizService.createQuiz(body);

  res.status(201).json(quiz);
};

const putQuiz = async (req: Request, res: Response<IQuiz>) => {
  const { quizId } = req.params;
  const { body } = req;

  const quiz = await QuizService.updateQuiz(quizId, body);

  res.status(200).json(quiz);
};

const deleteQuiz = async (req: Request, res: Response) => {
  const { quizId } = req.params;
  await QuizService.deleteQuiz(quizId);

  res.status(204).send();
};

export default { getQuizzes, getQuiz, postQuiz, putQuiz, deleteQuiz };
