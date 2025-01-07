import { useEffect, useState } from "react";
import QuizService from "../../services/QuizService";
import { createSearchParams, useNavigate, useParams } from "react-router";
import styles from "./QuizPage.module.css";
import Quiz from "../../types/quiz";
import QuestionCard from "../QuestionCard/QuestionCard";

const QuizPage = () => {
  const { quizId } = useParams() as { quizId: string };
  const [quiz, setQuiz] = useState<Quiz>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const fetchedQuiz = await QuizService.getQuiz(quizId);
      setQuiz(fetchedQuiz);
    };

    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return <p>No quiz</p>;
  }

  const handleHost = () => {
    navigate({
      pathname: "/play/host",
      search: createSearchParams({
        quiz: quiz._id,
      }).toString(),
    });
  };

  const handleDelete = async () => {
    await QuizService.deleteQuiz(quiz._id);
    navigate("/");
  };

  return (
    <>
      <section className={styles["quiz-details"]}>
        <h1>{quiz.title}</h1>
        <div className={styles["quiz-actions"]}>
          <button
            className={styles["host-btn"]}
            type="button"
            onClick={handleHost}
          >
            Host
          </button>
          <button className={styles["edit-btn"]} type="button">
            Edit
          </button>
          <button
            className={styles["delete-btn"]}
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </section>
      <section className={styles.questions}>
        <h2>Questions</h2>
        {quiz.questions.map((q, i) => (
          <QuestionCard key={i} question={q} number={i + 1} />
        ))}
      </section>
    </>
  );
};

export default QuizPage;
