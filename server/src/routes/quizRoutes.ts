import { Router } from "express";
import QuizController from "../controllers/QuizController";
import passport from "passport";
import verifyQuizAccess from "../middlewares/verifyQuizAccess";

const router = Router();

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    QuizController.getQuizzes
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    QuizController.postQuiz
  );

router
  .route("/:quizId")
  .get(QuizController.getQuiz)
  .put(
    passport.authenticate("jwt", { session: false }),
    verifyQuizAccess,
    QuizController.putQuiz
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    verifyQuizAccess,
    QuizController.deleteQuiz
  );

export default router;
