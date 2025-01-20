import styles from "./QuestionResult.module.css";

type Props = { correct: boolean; score: number };

const QuestionResult = ({ correct, score }: Props) => {
  const containerClass = correct
    ? styles["container-correct"]
    : styles["container-incorrect"];

  return (
    <div className={`${styles.container} ${containerClass}`}>
      <p className={styles["result-text"]}>
        {correct ? `Correct! Score +${score}` : "Incorrect..."}
      </p>
    </div>
  );
};

export default QuestionResult;
