import { useEffect, useState } from "react";
import styles from "./QuizzesPage.module.css";
import QuizService from "../../services/QuizService";
import Quiz from "../../types/quiz";
import QuizCard from "../QuizCard/QuizCard";
import { useNavigate } from "react-router";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const fetchedQuizzes = await QuizService.getQuizzes();
      setQuizzes(fetchedQuizzes);
    };

    fetchQuizzes();
  }, []);

  const handleCreate = () => {
    navigate("/creator");
  };

  return (
    <>
      <section className={styles.hero}>
        <h1>Your Quizzes</h1>
        <p>Manage your quizzes or create new ones.</p>
        <button
          className={styles["create-btn"]}
          type="button"
          onClick={handleCreate}
        >
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
