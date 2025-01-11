import CustomError from "./CustomError";

class NotVerifiedError extends CustomError {
  message: string;

  constructor(message: string = "User is not verified") {
    super(message);
    this.name = "NotVerifiedError";
    this.code = "NOT_VERIFIED";
    this.message = message;
  }
}

export default NotVerifiedError;
