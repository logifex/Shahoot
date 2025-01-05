import { Schema } from "mongoose";

export const answerSchema = new Schema({
  answer: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxlength: 75,
  },
  correct: { type: Boolean, required: true },
});

export default answerSchema;
