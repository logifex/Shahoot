import CustomError from "./CustomError";

class UserExistsError extends CustomError {
  message: string;

  constructor(message: string = "User already exists") {
    super(message);
    this.name = "UserExistsError";
    this.code = "USER_EXISTS";
    this.message = message;
  }
}

export default UserExistsError;
