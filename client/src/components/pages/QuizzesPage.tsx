import { useContext, useEffect, useState } from "react";
import styles from "./QuizzesPage.module.css";
import QuizService from "../../services/QuizService";
import Quiz from "../../types/quiz";
import QuizCard from "../QuizCard/QuizCard";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import Button from "../ui/Button/Button";
import { AxiosError } from "axios";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!userData) {
        return;
      }

      try {
        const fetchedQuizzes = await QuizService.getQuizzes(userData.token);
        setQuizzes(fetchedQuizzes);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err);
        }
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [userData]);

  const handleCreate = () => {
    navigate("/creator");
  };

  return (
    <>
      <section className={styles.hero}>
        <h1>Your Quizzes</h1>
        <p>Manage your quizzes or create new ones.</p>
        <Button
          variant="inverted"
          className={styles["create-btn"]}
          type="button"
          onClick={handleCreate}
        >
          + Create New Quiz
        </Button>
      </section>
      <section className={styles.quizzes}>
        {!quizzes && loading && <p className="page-message">Loading...</p>}
        {!quizzes && error && <p>Error loading quizzes</p>}
        {quizzes?.map((q) => (
          <QuizCard key={q._id} quiz={q} />
        ))}
      </section>
    </>
  );
};

export default QuizzesPage;
