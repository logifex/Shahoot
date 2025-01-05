import IQuiz from "quiz";
import Quiz from "../models/Quiz";

const getQuizzes = async (): Promise<IQuiz[]> => {
  const quizzes = await Quiz.find();

  return quizzes;
};

const getQuiz = async (id: string): Promise<IQuiz | null> => {
  const quiz = await Quiz.findById(id);

  return quiz;
};

const createQuiz = async (quizInput: IQuiz): Promise<IQuiz> => {
  const quiz = await Quiz.create(quizInput);

  return quiz;
};

const updateQuiz = async (id: string, quizInput: IQuiz): Promise<IQuiz> => {
  const quiz = await Quiz.findByIdAndUpdate(id, quizInput, {
    new: true,
    runValidators: true,
  });

  if (!quiz) {
    throw new Error("No quiz found");
  }

  return quiz;
};

const deleteQuiz = async (id: string) => {
  await Quiz.deleteOne({ _id: id });
};

export default { getQuizzes, getQuiz, createQuiz, updateQuiz, deleteQuiz };
