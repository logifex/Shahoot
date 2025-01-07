import Question from "../../types/question";
import styles from "./QuestionCard.module.css";

type Props = { question: Question; number: number };

const QuestionCard = ({ question, number }: Props) => {
  return (
    <div className={styles["question-card"]}>
      <h3>Question {number}</h3>
      <p>{question.question}</p>
      <ol className={styles.answers}>
        {question.answers.map((a, i) => (
          <li key={i}>{a.answer}</li>
        ))}
      </ol>
    </div>
  );
};

export default QuestionCard;
