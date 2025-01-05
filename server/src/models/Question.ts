import { model, Schema } from "mongoose";
import IQuestion from "question";
import { answerSchema } from "./Answer";

export const questionSchema = new Schema({
  question: { type: String, required: true },
  answers: { type: [answerSchema], required: true },
});

const Question = model<IQuestion>("Question", questionSchema);

export default Question;
