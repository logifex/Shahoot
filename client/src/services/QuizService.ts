import axios from "axios";
import Quiz from "../types/quiz";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const QuizService = {
  getQuiz: async (id: string): Promise<Quiz> => {
    const quiz: Quiz = await axios.get(`${BASE_URL}/quiz/${id}`);

    return quiz;
  },
};

export default QuizService;
