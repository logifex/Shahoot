import { Types } from "mongoose";
import IQuestion from "question";

export interface IQuizInput {
  title: string;
  questions: IQuestion[];
}

interface IQuiz {
  _id: Types.ObjectId;
  title: string;
  questions: IQuestion[];
}

export default IQuiz;
