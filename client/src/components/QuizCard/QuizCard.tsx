import { useNavigate } from "react-router";
import Quiz from "../../types/quiz";
import styles from "./QuizCard.module.css";
import Button from "../ui/Button/Button";

type Props = { quiz: Quiz };

const QuizCard = ({ quiz }: Props) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/quiz/${quiz._id}`);
  };

  return (
    <div className={styles["quiz-card"]}>
      <h2>{quiz.title}</h2>
      <Button variant="primary" type="button" onClick={handleView}>
        View
      </Button>
    </div>
  );
};

export default QuizCard;
