interface Player {
  id: string;
  nickname: string;
  score: number;
}

export interface PlayerSession extends Player {
  round: { score: number; chosenAnswerIndex?: number };
}

export default Player;
