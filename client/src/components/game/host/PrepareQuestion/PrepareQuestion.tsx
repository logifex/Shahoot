import styles from "./PrepareQuestion.module.css";

type Props = { question: string; questionNumber: number };

const PrepareQuestion = ({ question, questionNumber }: Props) => {
  return (
    <>
      <p className={styles["question-number-text"]}>
        Question {questionNumber}
      </p>
      <p className={styles["question-text"]}>{question}</p>
    </>
  );
};

export default PrepareQuestion;
