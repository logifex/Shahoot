import { Router } from "express";
import QuizController from "../controllers/QuizController";

const router = Router();

router.get("/", QuizController.getQuizzes);
router.get("/:quizId", QuizController.getQuiz);
router.post("/", QuizController.postQuiz);

export default router;
