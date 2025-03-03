import { Socket } from "socket.io";
import IPlayer from "./player";
import IQuestion from "./question";

export interface IServerToClientEvents {
  gameCreated: (pin: string, questions: IQuestion[]) => void;
  joinSuccess: (pin: string) => void;
  playerJoined: (player: IPlayer) => void;
  prepareQuestion: (index: number, amount: number) => void;
  startQuestion: () => void;
  playerAnswered: () => void;
  revealAnswers: (players: IPlayer[]) => void;
  revealResult: (
    correct: boolean,
    score: number,
    totalScore: number,
    rank: number,
    leadingUser?: IPlayer
  ) => void;
  gameDisconnected: () => void;
  error: (message: string) => void;
}

export interface IClientToServerEvents {
  gameCreate: (quizId: unknown) => void;
  playerJoin: (pin: unknown, nickname: unknown) => void;
  nextQuestion: (pin: unknown) => void;
  playerAnswer: (pin: unknown, answerIndex: unknown) => void;
  skip: (pin: unknown) => void;
}

export type AppSocket = Socket<IClientToServerEvents, IServerToClientEvents>;
