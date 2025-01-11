import Question from "./question";

export interface QuizInput {
  title: string;
  questions: Question[];
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
  user: string | { _id: string; username: string };
}

export default Quiz;
