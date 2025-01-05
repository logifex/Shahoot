import { model, Schema } from "mongoose";
import IQuiz from "quiz";
import { questionSchema } from "./Question";
import IQuestion from "question";

const questionsLengthValidator = (questions: IQuestion[]) => {
  return questions.length > 0 && questions.length < 100;
};

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 120,
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
