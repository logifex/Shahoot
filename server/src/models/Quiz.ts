import { model, Schema } from "mongoose";
import IQuiz from "quiz";
import { questionSchema } from "./Question";

const quizSchema = new Schema({
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
});

const Quiz = model<IQuiz>("Quiz", quizSchema);

export default Quiz;
