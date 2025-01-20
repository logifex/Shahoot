import IQuiz from "../types/quiz";
import Quiz from "../models/Quiz";
import { IQuizInput } from "../types/quiz";
import QuizNotFound from "../errors/QuizNotFound";

const getQuizzes = async (userId: string): Promise<IQuiz[]> => {
  const quizzes = await Quiz.find({ user: userId });

  return quizzes;
};

const getQuiz = async (id: string): Promise<IQuiz | null> => {
  const quiz = await Quiz.findById(id).populate({
    path: "user",
    select: "username",
  });

  return quiz;
};

const createQuiz = async (
  quizInput: IQuizInput,
  userId: string
): Promise<IQuiz> => {
  const quiz = await Quiz.create({ ...quizInput, user: userId });

  return quiz;
};

const updateQuiz = async (
  id: string,
  quizInput: IQuizInput
): Promise<IQuiz> => {
  const quiz = await Quiz.findByIdAndUpdate(id, quizInput, {
    new: true,
    runValidators: true,
  });
  
  if (!quiz) {
    throw new QuizNotFound();
  }

  return quiz;
};

const deleteQuiz = async (id: string) => {
  await Quiz.deleteOne({ _id: id });
};

const verifyQuizAccess = async (quizId: string, userId: string) => {
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    throw new QuizNotFound();
  }

  if (quiz.user.toString() === userId) {
    return true;
  }

  return false;
};

export default {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  verifyQuizAccess,
};
