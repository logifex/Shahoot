import useTimer from "../../../hooks/useTimer";
import styles from "./PrepareQuestionTimer.module.css";

type Props = { questionNumber: number };

const PrepareQuestionTimer = ({ questionNumber }: Props) => {
  const timer = useTimer(5);

  return (
    <div className="flex-center">
      <p className={styles.timer}>{timer}</p>
      <p className={styles["question-text"]}>Question {questionNumber}</p>
    </div>
  );
};

export default PrepareQuestionTimer;
