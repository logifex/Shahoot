import { model, Schema, Types } from "mongoose";
import { questionSchema } from "./Question";
import IQuestion from "../types/question";
import IQuiz from "../types/quiz";

const questionsLengthValidator = (questions: IQuestion[]) => {
  return questions.length > 0 && questions.length < 100;
};

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxlength: 120,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: {
      validator: questionsLengthValidator,
      message: "A quiz must have between 1 and 99 questions.",
    },
  },
});

const Quiz = model<IQuiz>("Quiz", quizSchema);

export default Quiz;
