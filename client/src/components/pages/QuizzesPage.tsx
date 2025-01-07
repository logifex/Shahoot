import { useEffect, useState } from "react";
import styles from "./QuizzesPage.module.css";
import QuizService from "../../services/QuizService";
import Quiz from "../../types/quiz";
import QuizCard from "../QuizCard/QuizCard";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const fetchedQuizzes = await QuizService.getQuizzes();
      setQuizzes(fetchedQuizzes);
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <h1>Your Quizzes</h1>
        <p>Manage your quizzes or create new ones.</p>
        <button className={styles["create-btn"]} type="button">
          + Create New Quiz
        </button>
      </section>
      <section className={styles.quizzes}>
        {quizzes?.map((q) => (
          <QuizCard key={q._id} quiz={q} />
        ))}
      </section>
    </>
  );
};

export default QuizzesPage;
