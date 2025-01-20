import styles from "./AnswerButton.module.css";

type Props = { index: number; onAnswer?: (index: number) => void };

const AnswerButton = ({ index, onAnswer }: Props) => {
  const number = index + 1;
  let colorClassName = styles["first-answer"];

  if (number === 2) {
    colorClassName = styles["second-answer"];
  } else if (number === 3) {
    colorClassName = styles["third-answer"];
  } else if (number === 4) {
    colorClassName = styles["fourth-answer"];
  }

  return (
    <button
      className={`${styles.button} ${colorClassName}`}
      type="button"
      disabled={!onAnswer}
      onClick={() => onAnswer?.call(this, index)}
    >
      {number}
    </button>
  );
};

export default AnswerButton;
