import express from "express";
import { createServer } from "http";
import { configSocket } from "./socket";

const app = express();
const httpServer = createServer(app);
configSocket(httpServer);

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
