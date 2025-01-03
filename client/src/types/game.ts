import Player from "./player";
import Question from "./question";

type Game = {
  pin: string;
  players: Player[];
  questions: Question[];
  currentQuestionIndex: number;
};

export default Game;
