import { useContext, useEffect, useState } from "react";
import QuizService from "../../services/QuizService";
import { createSearchParams, useNavigate, useParams } from "react-router";
import styles from "./QuizPage.module.css";
import Quiz from "../../types/quiz";
import QuestionCard from "../QuestionCard/QuestionCard";
import AuthContext from "../../context/AuthContext";
import Button from "../ui/Button/Button";

const QuizPage = () => {
  const { quizId } = useParams() as { quizId: string };
  const [quiz, setQuiz] = useState<Quiz>();

  const { userData } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const fetchedQuiz = await QuizService.getQuiz(quizId);
      setQuiz(fetchedQuiz);
    };

    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return <p className="page-message">No quiz found.</p>;
  }

  const handleHost = () => {
    navigate({
      pathname: "/play/host",
      search: createSearchParams({
        quiz: quiz._id,
      }).toString(),
    });
  };

  const handleEdit = async () => {
    navigate(`/creator/${quizId}`);
  };

  const handleDelete = async () => {
    if (!userData) {
      return;
    }

    await QuizService.deleteQuiz(quiz._id, userData.token);
    navigate("/");
  };

  const quizCreator = quiz.user as { _id: string; username: string };

  return (
    <>
      <section className={styles["quiz-details"]}>
        <h1>{quiz.title}</h1>
        {<p>By {quizCreator.username}</p>}
        <div className={styles["quiz-actions"]}>
          <Button
            variant="primary"
            className={styles.btn}
            type="button"
            onClick={handleHost}
          >
            Host
          </Button>
          {quizCreator._id === userData?.user._id && (
            <>
              <Button
                variant="secondary"
                className={styles.btn}
                type="button"
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className={styles.btn}
                type="button"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
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
