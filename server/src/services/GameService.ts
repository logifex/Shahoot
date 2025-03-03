import IGame from "../types/game";
import IPlayer from "../types/player";
import IQuiz from "../types/quiz";
import calculateScore from "../utils/calculateScore";
import generatePinCode from "../utils/generatePinCode";
import GameNotFound from "../errors/GameNotFound";
import getIo from "../socket";

const games = new Map<string, IGame>();

const getGame = (pin: string): IGame | undefined => {
  return games.get(pin);
};

const createNewGame = (host: string, quiz: IQuiz): IGame => {
  const gamePin = generatePinCode();

  const game: IGame = {
    pin: gamePin,
    host: host,
    players: [],
    questions: quiz.questions,
    currentQuestionIndex: -1,
    gettingAnswers: false,
    questionStartTime: 0,
  };

  games.set(gamePin, game);
  return game;
};

const addPlayer = (pin: string, playerId: string, nickname: string) => {
  const game = getGame(pin);

  if (!game) {
    throw new GameNotFound();
  }

  const player: IPlayer = {
    id: playerId,
    nickname: nickname,
    score: 0,
  };
  getIo().to(game.host).emit("playerJoined", player);
  game.players.push({ ...player, round: { score: 0 } });
};

const moveToQuestion = (pin: string, questionIndex: number) => {
  const game = getGame(pin);

  if (!game) {
    throw new GameNotFound();
  }

  game.currentQuestionIndex = questionIndex;
  game.players = game.players.map((p) => ({ ...p, round: { score: 0 } }));
  getIo()
    .to(`room-${pin}`)
    .emit(
      "prepareQuestion",
      questionIndex,
      game.questions[questionIndex].answers.length
    );
};

const startQuestion = (pin: string) => {
  const game = getGame(pin);

  if (!game) {
    throw new GameNotFound();
  }

  getIo().to(`room-${pin}`).emit("startQuestion");
  game.gettingAnswers = true;
  game.questionStartTime = Date.now();
};

const revealAnswers = (pin: string) => {
  const game = getGame(pin);

  if (!game) {
    throw new GameNotFound();
  }

  game.gettingAnswers = false;
  const currentQuestion = game.questions[game.currentQuestionIndex];
  const scoreSortedPlayers = game.players
    .slice()
    .sort((a, b) => b.score - a.score);

  scoreSortedPlayers.forEach((player, i) => {
    const chosenAnswerIndex = player.round.chosenAnswerIndex;
    const correct =
      chosenAnswerIndex !== undefined
        ? currentQuestion.answers[chosenAnswerIndex].correct
        : false;

    const leadingUser = i > 0 ? scoreSortedPlayers[i - 1] : undefined;
    getIo()
      .to(player.id)
      .emit(
        "revealResult",
        correct,
        player.round.score,
        player.score,
        i + 1,
        leadingUser && {
          id: leadingUser.id,
          nickname: leadingUser.nickname,
          score: leadingUser.score,
        }
      );
  });

  getIo()
    .to(game.host)
    .emit(
      "revealAnswers",
      game.players.map((p) => ({
        id: p.id,
        nickname: p.nickname,
        score: p.score,
      }))
    );
};

const submitAnswer = (
  pin: string,
  playerId: string,
  chosenAnswerIndex: number
) => {
  const game = getGame(pin);

  if (!game) {
    throw new GameNotFound();
  }

  const player = game.players.find((p) => p.id === playerId);
  if (!player || player.round.chosenAnswerIndex) {
    return;
  }

  player.round.chosenAnswerIndex = chosenAnswerIndex;
  const currentQuestion = game.questions[game.currentQuestionIndex];
  if (currentQuestion.answers[chosenAnswerIndex].correct) {
    player.round.score = calculateScore(
      game.questionStartTime,
      currentQuestion.timer
    );
    player.score += player.round.score;
  }
  getIo().to(game.host).emit("playerAnswered");
};

const removeGame = (pin: string) => {
  games.delete(pin);
  getIo().to(`room-${pin}`).emit("gameDisconnected");
};

export default {
  getGame,
  createNewGame,
  addPlayer,
  moveToQuestion,
  startQuestion,
  revealAnswers,
  submitAnswer,
  removeGame,
};
