import Timer from "../Timer/Timer";
import styles from "./PrepareQuestionTimer.module.css";

type Props = { questionNumber: number };

const PrepareQuestionTimer = ({ questionNumber }: Props) => {
  return (
    <div className="game-container">
      <Timer time={5} />
      <p className={styles["question-text"]}>Question {questionNumber}</p>
    </div>
  );
};

export default PrepareQuestionTimer;
