import IPlayer from "./player";
import IQuestion from "./question";

export interface IServerToClientEvents {
  gameCreated: (pin: string, questions: IQuestion[]) => void;
  joinSuccess: (pin: string) => void;
  playerJoined: (player: IPlayer) => void;
  prepareQuestion: (index: number, amount: number) => void;
  startQuestion: () => void;
  revealAnswers: (players: IPlayer[]) => void;
  revealResult: (correct: boolean, score: number) => void;
  gameDisconnected: () => void;
}

export interface IClientToServerEvents {
  gameCreate: (quizId: unknown) => void;
  playerJoin: (pin: unknown, nickname: unknown) => void;
  nextQuestion: (pin: unknown) => void;
  playerAnswer: (pin: unknown, answerIndex: unknown) => void;
  skip: (pin: unknown) => void;
}
