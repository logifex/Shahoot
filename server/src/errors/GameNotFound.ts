import CustomError from "./CustomError";

class GameNotFound extends CustomError {
  message: string;

  constructor(message: string = "Game not found") {
    super(message);
    this.name = "GameNotFound";
    this.code = "GAME_NOT_FOUND";
    this.message = message;
  }
}

export default GameNotFound;
