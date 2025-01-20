import CustomError from "../errors/CustomError";
import { AppSocket } from "../types/socket";

const errorHandler = (
  socket: AppSocket,
  handler: (...args: any[]) => void | Promise<void>
) => {
  const handleError = (err: unknown) => {
    if (err instanceof CustomError) {
      socket.emit("error", err.message);
      return;
    }
    socket.emit("error", "An error occurred");
    console.error(err);
  };

  return (...args: any[]) => {
    try {
      const ret = handler.apply(socket, args);
      if (ret && typeof ret.catch === "function") {
        ret.catch(handleError);
      }
    } catch (e) {
      handleError(e);
    }
  };
};

export default errorHandler;
