interface IPlayer {
  id: string;
  nickname: string;
  score: number;
}

export interface IPlayerSession extends IPlayer {
  round: { score: number; chosenAnswerIndex?: number };
}

export default IPlayer;
