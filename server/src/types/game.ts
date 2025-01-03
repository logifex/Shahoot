import { PlayerSession } from "player";
import Question from "question";

type Game = {
  pin: string;
  host: string;
  players: PlayerSession[];
  questions: Question[];
  currentQuestionIndex: number;
  gettingAnswers: boolean;
};

export default Game;
