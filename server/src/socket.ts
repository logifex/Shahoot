import { Server as SocketServer } from "socket.io";
import { Server } from "http";
import DUMMY_QUESTIONS from "./DUMMY_QUESTIONS";
import Player from "player";
import { ClientToServerEvents, ServerToClientEvents } from "socket";
import Game from "game";
import generatePinCode from "./utils/generatePinCode";
import calculateScore from "./utils/calculateScore";

const PREPARE_QUESTION_TIMEOUT = 5000;
const QUESTION_TIMEOUT = 10000;

let io: SocketServer<ClientToServerEvents, ServerToClientEvents> | undefined =
  undefined;

const games: Game[] = [];

export const configSocket = (httpServer: Server) => {
  io = new SocketServer(httpServer, { cors: { origin: "*" } });

  // TODO add error handling
  io.on("connection", (socket) => {
    const createGame = () => {
      const gamePin = generatePinCode();
      const game: Game = {
        pin: gamePin,
        host: socket.id,
        players: [],
        questions: DUMMY_QUESTIONS,
        currentQuestionIndex: -1,
        gettingAnswers: false,
        questionTime: 0,
      };
      games.push(game);
      socket.join(`room-${gamePin}`);
      socket.emit("gameCreated", gamePin, game.questions);
    };

    const joinGame = (pin: unknown, nickname: unknown) => {
      // TODO add more validation for nickname (e.g. length)
      if (
        typeof pin !== "string" ||
        typeof nickname !== "string" ||
        socket.rooms.has(`room-${pin}`)
      ) {
        return;
      }

      const game = games.find((g) => g.pin === pin);
      if (!game) {
        return;
      }

      const player: Player = {
        id: socket.id,
        nickname: nickname,
        score: 0,
      };
      io.to(game.host).emit("playerJoined", player);
      game.players.push({ ...player, round: { score: 0 } });
      socket.join(`room-${pin}`);
      socket.emit("joinSuccess", pin);
    };

    const startQuestion = (pin: unknown) => {
      if (typeof pin !== "string") {
        return;
      }

      const game = games.find((g) => g.pin === pin);
      if (
        !game ||
        game.host !== socket.id ||
        game.gettingAnswers ||
        game.currentQuestionIndex >= game.questions.length - 1
      ) {
        return;
      }

      const currentQuestionIndex = ++game.currentQuestionIndex;
      game.players = game.players.map((p) => ({ ...p, round: { score: 0 } }));
      io.to(`room-${pin}`).emit(
        "prepareQuestion",
        currentQuestionIndex,
        game.questions[currentQuestionIndex].answers.length
      );

      setTimeout(() => {
        io.to(`room-${pin}`).emit("startQuestion");
        game.gettingAnswers = true;
        game.questionTime = Date.now();
        setTimeout(() => {
          if (
            game.gettingAnswers &&
            game.currentQuestionIndex === currentQuestionIndex
          ) {
            revealAnswers(pin);
          }
        }, QUESTION_TIMEOUT);
      }, PREPARE_QUESTION_TIMEOUT);
    };

    const handleAnswer = (pin: unknown, index: unknown) => {
      if (typeof pin !== "string" || typeof index !== "number") {
        return;
      }

      const game = games.find((g) => g.pin === pin);
      const currentQuestion = game.questions[game.currentQuestionIndex];
      if (
        !game ||
        !game.gettingAnswers ||
        index < 0 ||
        index > currentQuestion.answers.length - 1
      ) {
        return;
      }

      const player = game.players.find((p) => p.id === socket.id);
      if (!player || player.round.chosenAnswerIndex) {
        return;
      }

      player.round.chosenAnswerIndex = index;
      if (currentQuestion.answers[index].correct) {
        player.round.score = calculateScore(game.questionTime);
      }

      if (!game.players.find((p) => p.round.chosenAnswerIndex === undefined)) {
        revealAnswers(pin);
      }
    };

    const revealAnswers = (pin: string) => {
      const game = games.find((g) => g.pin === pin);
      if (!game || !game.gettingAnswers) {
        return;
      }

      game.gettingAnswers = false;
      const currentQuestion = game.questions[game.currentQuestionIndex];

      game.players.forEach((player) => {
        const chosenAnswerIndex = player.round.chosenAnswerIndex;
        const correct =
          chosenAnswerIndex !== undefined
            ? currentQuestion.answers[player.round.chosenAnswerIndex].correct
            : false;
        player.score += player.round.score;
        io.to(player.id).emit("revealResult", correct, player.round.score);
      });

      io.to(game.host).emit(
        "revealAnswers",
        game.players.map((p) => ({
          id: p.id,
          nickname: p.nickname,
          score: p.score,
        }))
      );
    };

    const handleSkip = (pin: unknown) => {
      if (typeof pin !== "string") {
        return;
      }

      const game = games.find((g) => g.pin === pin);
      if (!game || game.host !== socket.id) {
        return;
      }

      revealAnswers(pin);
    };

    socket.on("gameCreate", createGame);
    socket.on("playerJoin", joinGame);
    socket.on("nextQuestion", startQuestion);
    socket.on("playerAnswer", handleAnswer);
    socket.on("skip", handleSkip);
  });

  io.of("/").adapter.on("leave-room", async (room) => {
    const regex = /room-(\d{5})/;
    const match = room.match(regex);
    if (!match) {
      return;
    }

    const pin = match[1];
    const sockets = await io.in(room).fetchSockets();

    const gameIndex = games.findIndex((g) => g.pin === pin);
    if (gameIndex === -1) {
      return;
    }

    if (
      sockets.length === 0 ||
      !sockets.find((s) => s.id === games[gameIndex].host) ||
      (games[gameIndex].currentQuestionIndex >= 0 && sockets.length <= 1)
    ) {
      games.splice(gameIndex, 1);
      io.to(room).emit("gameDisconnected");
      sockets.forEach((s) => s.leave(room));
    }
  });
};

export default io;
