import Question from "./question";

export interface QuizInput {
  title: string;
  questions: Question[];
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

export default Quiz;
