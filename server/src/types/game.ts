import { IPlayerSession } from "player";
import IQuestion from "question";

interface IGame {
  pin: string;
  host: string;
  players: IPlayerSession[];
  questions: IQuestion[];
  currentQuestionIndex: number;
  questionTime: number;
  gettingAnswers: boolean;
}

export default IGame;
