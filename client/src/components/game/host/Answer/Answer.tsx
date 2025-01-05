import styles from "./Answer.module.css";

type Props = {
  text: string;
  correct: boolean;
  number: number;
};

const Answer = ({ text, correct, number }: Props) => {
  let colorClassName = styles["first-answer"];

  if (number === 2) {
    colorClassName = styles["second-answer"];
  } else if (number === 3) {
    colorClassName = styles["third-answer"];
  } else if (number === 4) {
    colorClassName = styles["fourth-answer"];
  }

  return (
    <div className={`${styles.container} ${colorClassName}`}>
      <p className={correct ? styles.correct : undefined}>
        {number}. {text}
      </p>
    </div>
  );
};

export default Answer;
