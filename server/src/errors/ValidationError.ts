import { ValidationErrorResponse } from "../types/error";
import CustomError from "./CustomError";

class ValidationError extends CustomError {
  message: string;
  errors?: ValidationErrorResponse[];

  constructor(errors?: ValidationErrorResponse[], message: string = "") {
    super(message);
    this.name = "ValidationError";
    this.code = "VALIDATION_ERROR";
    this.message = message;
    this.errors = errors;
  }
}

export default ValidationError;
