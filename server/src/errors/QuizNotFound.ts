import CustomError from "./CustomError";

class QuizNotFound extends CustomError {
  message: string;

  constructor(message: string = "Quiz not found") {
    super(message);
    this.name = "QuizNotFound";
    this.code = "QUIZ_NOT_FOUND";
    this.message = message;
  }
}

export default QuizNotFound;
