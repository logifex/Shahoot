import Player from "player";
import Question from "question";

export interface ServerToClientEvents {
  gameCreated: (pin: string, questions: Question[]) => void;
  joinSuccess: (pin: string) => void;
  playerJoined: (player: Player) => void;
  prepareQuestion: (index: number, amount: number) => void;
  startQuestion: () => void;
  revealAnswers: (players: Player[]) => void;
  revealResult: (correct: boolean, score: number) => void;
  gameDisconnected: () => void;
}

export interface ClientToServerEvents {
  gameCreate: () => void;
  playerJoin: (pin: unknown, nickname: unknown) => void;
  nextQuestion: (pin: unknown) => void;
  playerAnswer: (pin: unknown, answerIndex: unknown) => void;
  skip: (pin: unknown) => void;
}
