import { useNavigate } from "react-router";
import Quiz from "../../types/quiz";
import styles from "./QuizCard.module.css";

type Props = { quiz: Quiz };

const QuizCard = ({ quiz }: Props) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/quiz/${quiz._id}`);
  };

  return (
    <div className={styles["quiz-card"]}>
      <h2>{quiz.title}</h2>
      <button className={styles["view-btn"]} type="button" onClick={handleView}>
        View
      </button>
    </div>
  );
};

export default QuizCard;
