import { model, Schema } from "mongoose";
import IAnswer from "answer";

export const answerSchema = new Schema({
  answer: { type: String, required: true },
  correct: { type: Boolean, required: true },
});

const Answer = model<IAnswer>("Answer", answerSchema);

export default Answer;
