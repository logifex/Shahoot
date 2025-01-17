import Timer from "../Timer/Timer";
import styles from "./PrepareQuestionTimer.module.css";

type Props = { questionNumber: number };

const PrepareQuestionTimer = ({ questionNumber }: Props) => {
  return (
    <>
      <Timer time={5} />
      <p className={styles["question-text"]}>Question {questionNumber}</p>
    </>
  );
};

export default PrepareQuestionTimer;
