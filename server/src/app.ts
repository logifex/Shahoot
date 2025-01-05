import express from "express";
import { createServer } from "http";
import { configSocket } from "./socket";
import quizRoutes from "./routes/quizRoutes";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
configSocket(httpServer);

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/quiz", quizRoutes);

httpServer.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    console.log(`App is running at port ${port}`);
  } catch (err) {
    console.log("Error connecting to database");
  }
});
