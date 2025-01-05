import { Schema } from "mongoose";
import { answerSchema } from "./Answer";
import IAnswer from "answer";

const answersLengthValidator = (answers: IAnswer[]) => {
  return answers.length >= 2 && answers.length <= 4;
};

export const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 120,
  },
  answers: {
    type: [answerSchema],
    required: true,
    validate: {
      validator: answersLengthValidator,
      message: "A question must have between 2 and 4 answers.",
    },
  },
});

export default questionSchema;
