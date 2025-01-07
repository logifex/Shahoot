import axios from "axios";
import Quiz, { QuizInput } from "../types/quiz";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const QuizService = {
  getQuizzes: async (): Promise<Quiz[]> => {
    const quizzes: Quiz[] = (await axios.get(`${BASE_URL}/quiz`)).data;

    return quizzes;
  },
  getQuiz: async (id: string): Promise<Quiz> => {
    const quiz: Quiz = (await axios.get(`${BASE_URL}/quiz/${id}`)).data;

    return quiz;
  },
  createQuiz: async (quizInput: QuizInput): Promise<Quiz> => {
    const quiz: Quiz = (await axios.post(`${BASE_URL}/quiz`, quizInput)).data;

    return quiz;
  },
  updateQuiz: async (quidId: string, quizInput: QuizInput): Promise<Quiz> => {
    const quiz: Quiz = (await axios.put(`${BASE_URL}/quiz/${quidId}`, quizInput)).data;

    return quiz;
  },
  deleteQuiz: async (quizId: string) => {
    await axios.delete(`${BASE_URL}/quiz/${quizId}`);
  },
};

export default QuizService;
