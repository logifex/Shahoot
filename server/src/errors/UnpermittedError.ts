import CustomError from "./CustomError";

class UnpermittedError extends CustomError {
  message: string;

  constructor(
    message: string = "User is not permitted to perform this action"
  ) {
    super(message);
    this.name = "UnpermittedError";
    this.code = "UNPERMITTED";
    this.message = message;
  }
}

export default UnpermittedError;
