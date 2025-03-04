import Quiz from "../../types/quiz";
import styles from "./QuizCard.module.css";
import Button from "../ui/Button/Button";

type Props = { quiz: Quiz };

const QuizCard = ({ quiz }: Props) => {
  return (
    <div className={styles.card}>
      <h2>{quiz.title}</h2>
      <Button variant="primary" to={`/quiz/${quiz._id}`}>
        View
      </Button>
    </div>
  );
};

export default QuizCard;
