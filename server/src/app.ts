import express from "express";
import "express-async-errors";
import { createServer } from "http";
import { configSocket } from "./socket";
import quizRoutes from "./routes/quizRoutes";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import ErrorController from "./controllers/ErrorController";
import helmet from "helmet";

const app = express();
const httpServer = createServer(app);
configSocket(httpServer);

const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL ?? "*" }));
app.use(bodyParser.json());

app.use("/quiz", quizRoutes);

app.use(ErrorController.handleErrors);
app.use(ErrorController.handleNotFound);

httpServer.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    console.log(`App is running at port ${port}`);
  } catch (err) {
    console.log("Error connecting to database");
  }
});
