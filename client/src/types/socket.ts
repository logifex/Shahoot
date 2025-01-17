import Player from "./player";
import Question from "./question";

export interface ServerToClientEvents {
  gameCreated: (pin: string, questions: Question[]) => void;
  joinSuccess: (pin: string) => void;
  playerJoined: (player: Player) => void;
  prepareQuestion: (index: number, amount: number) => void;
  startQuestion: () => void;
  playerAnswered: () => void;
  revealAnswers: (players: Player[]) => void;
  revealResult: (correct: boolean, score: number, totalScore: number) => void;
  gameDisconnected: () => void;
}

export interface ClientToServerEvents {
  gameCreate: (quizId: string) => void;
  playerJoin: (pin: string, nickname: string) => void;
  nextQuestion: (pin: string) => void;
  playerAnswer: (pin: string, answerIndex: number) => void;
  skip: (pin: string) => void;
}
