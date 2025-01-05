import { Router } from "express";
import QuizController from "../controllers/QuizController";

const router = Router();

router.route("/").get(QuizController.getQuizzes).post(QuizController.postQuiz);

router
  .route("/:quizId")
  .get(QuizController.getQuiz)
  .put(QuizController.putQuiz)
  .delete(QuizController.deleteQuiz);

export default router;
