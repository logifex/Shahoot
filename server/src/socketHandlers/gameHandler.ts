import QuizNotFound from "../errors/QuizNotFound";
import ValidationError from "../errors/ValidationError";
import GameService from "../services/GameService";
import QuizService from "../services/QuizService";
import getIo from "../socket";
import { AppSocket } from "../types/socket";
import {
  validateAnswerIndex,
  validateNickname,
  validatePin,
} from "../utils/socketValidations";

const PREPARE_QUESTION_TIMEOUT = 5 * 1000;

export async function createGame(this: AppSocket, quizId: unknown) {
  const socket = this;

  if (typeof quizId !== "string") {
    throw new ValidationError(undefined, "Invalid quiz id");
  }

  const quiz = await QuizService.getQuiz(quizId);
  if (!quiz) {
    throw new QuizNotFound();
  }

  const game = GameService.createNewGame(socket.id, quiz);

  socket.join(`room-${game.pin}`);
  socket.emit("gameCreated", game.pin, game.questions);
}

export function joinGame(this: AppSocket, pin: unknown, nickname: unknown) {
  const socket = this;
  validatePin(pin);
  validateNickname(nickname);

  if (socket.rooms.has(`room-${pin}`)) {
    return;
  }

  GameService.addPlayer(pin, socket.id, nickname);
  socket.join(`room-${pin}`);
  socket.emit("joinSuccess", pin);
}

export function startQuestion(this: AppSocket, pin: unknown) {
  const socket = this;
  validatePin(pin);

  const game = GameService.getGame(pin);
  if (
    !game ||
    game.host !== socket.id ||
    game.gettingAnswers ||
    game.currentQuestionIndex >= game.questions.length - 1
  ) {
    return;
  }

  const currentQuestionIndex = game.currentQuestionIndex + 1;
  GameService.moveToQuestion(pin, currentQuestionIndex);

  setTimeout(() => {
    try {
      GameService.startQuestion(pin);
      setTimeout(() => {
        if (game.currentQuestionIndex === currentQuestionIndex) {
          try {
            revealAnswers(pin);
          } catch {}
        }
      }, game.questions[currentQuestionIndex].timer * 1000);
    } catch {}
  }, PREPARE_QUESTION_TIMEOUT);
}

export function handleAnswer(this: AppSocket, pin: unknown, index: unknown) {
  const socket = this;
  validatePin(pin);

  const game = GameService.getGame(pin);
  if (!game || !game.gettingAnswers) {
    return;
  }

  const currentQuestion = game.questions[game.currentQuestionIndex];
  validateAnswerIndex(index, currentQuestion.answers.length);

  GameService.submitAnswer(pin, socket.id, index);
  if (!game.players.some((p) => p.round.chosenAnswerIndex === undefined)) {
    revealAnswers(pin);
  }
}

export function revealAnswers(pin: string) {
  const game = GameService.getGame(pin);
  if (!game || !game.gettingAnswers) {
    return;
  }

  GameService.revealAnswers(pin);
}

export function handleSkip(this: AppSocket, pin: unknown) {
  const socket = this;
  validatePin(pin);

  const game = GameService.getGame(pin);
  if (!game || game.host !== socket.id) {
    return;
  }

  revealAnswers(pin);
}

export async function handleLeaveRoom(pin: string) {
  const room = `room-${pin}`;
  const sockets = await getIo().in(room).fetchSockets();

  const game = GameService.getGame(pin);
  if (!sockets || !game) {
    return;
  }

  if (
    sockets.length === 0 ||
    !sockets.some((s) => s.id === game.host) ||
    (game.currentQuestionIndex >= 0 && sockets.length <= 1)
  ) {
    GameService.removeGame(pin);
    sockets.forEach((s) => s.leave(room));
  }
}
