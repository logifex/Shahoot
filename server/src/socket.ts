import { Server as SocketServer } from "socket.io";
import { Server } from "http";
import { IClientToServerEvents, IServerToClientEvents } from "./types/socket";
import errorHandler from "./socketHandlers/errorHandler";
import {
  createGame,
  handleAnswer,
  handleLeaveRoom,
  handleSkip,
  joinGame,
  startQuestion,
} from "./socketHandlers/gameHandler";

let io: SocketServer<IClientToServerEvents, IServerToClientEvents> | undefined =
  undefined;

const getIo = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }
  return io;
};

export const configSocket = (httpServer: Server) => {
  io = new SocketServer(httpServer, {
    cors: { origin: process.env.CLIENT_URL ?? "*" },
  });

  io.on("connection", (socket) => {
    socket.on("gameCreate", errorHandler(socket, createGame));
    socket.on("playerJoin", errorHandler(socket, joinGame));
    socket.on("nextQuestion", errorHandler(socket, startQuestion));
    socket.on("playerAnswer", errorHandler(socket, handleAnswer));
    socket.on("skip", errorHandler(socket, handleSkip));
  });

  io.of("/").adapter.on("leave-room", async (room: string) => {
    const regex = /room-(\d{5})/;
    const match = room.match(regex);
    if (!match) {
      return;
    }

    const pin = match[1];
    handleLeaveRoom(pin);
  });
};

export default getIo;
