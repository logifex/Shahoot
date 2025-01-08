import { Schema } from "mongoose";
import { answerSchema } from "./Answer";
import IAnswer from "answer";

const answersValidator = (answers: IAnswer[]) => {
  return (
    answers.length >= 2 &&
    answers.length <= 4 &&
    !!answers.find((a) => a.correct)
  );
};

export const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxlength: 120,
    },
    answers: {
      type: [answerSchema],
      required: true,
      validate: {
        validator: answersValidator,
        message:
          "A question must have between 2 and 4 answers and at least one correct answer.",
      },
    },
  },
  { _id: false }
);

export default questionSchema;
