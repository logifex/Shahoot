import express from "express";
import "express-async-errors";
import "dotenv/config";
import { createServer } from "http";
import { configSocket } from "./socket";
import authRoutes from "./routes/authRoutes";
import quizRoutes from "./routes/quizRoutes";
import "./config/passport";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import ErrorController from "./controllers/ErrorController";
import helmet from "helmet";
import passport from "passport";
import sgMail from "@sendgrid/mail";

const app = express();
const httpServer = createServer(app);
configSocket(httpServer);

const port = process.env.PORT || 3000;

const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL ?? "*" }));
app.use(passport.initialize());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
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
