import { Types } from "mongoose";
import IQuestion from "./question";

export interface IQuizInput {
  title: string;
  questions: IQuestion[];
}

interface IQuiz {
  _id: Types.ObjectId;
  title: string;
  questions: IQuestion[];
  user: Types.ObjectId | { _id: Types.ObjectId; username: string };
}

export default IQuiz;
