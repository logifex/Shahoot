import AnswerButton from "../AnswerButton/AnswerButton";
import styles from "./Answers.module.css";

type Props = { amount: number; onAnswer: (index: number) => void };

const Answers = ({ amount, onAnswer }: Props) => {
  const buttons = [];

  for (let i = 0; i < amount; i++) {
    buttons.push(
      <li key={i}>
        <AnswerButton index={i} onAnswer={onAnswer} />
      </li>
    );
  }

  return (
    <div className="game-container">
      <ol className={styles.answers}>{buttons}</ol>
    </div>
  );
};

export default Answers;
