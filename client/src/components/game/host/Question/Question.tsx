import Answer from "../Answer/Answer";
import QuestionType from "../../../../types/question";
import styles from "./Question.module.css";
import Button from "../../../ui/Button/Button";
import Timer from "../../Timer/Timer";

type Props = {
  question: QuestionType;
  showAnswers: boolean;
  onNext: () => void;
};

const Question = ({ question, showAnswers, onNext }: Props) => {
  return (
    <div className="game-container">
      {!showAnswers && <Timer time={10} />}
      <h2>{question.question}</h2>
      <div className={styles["answers-container"]}>
        <ol className={styles.answers}>
          {question.answers.map((a, i) => (
            <li key={i}>
              <Answer
                key={a.answer}
                text={a.answer}
                correct={showAnswers && a.correct}
                number={i + 1}
              />
            </li>
          ))}
        </ol>
      </div>
      <Button variant="primary" type="button" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

export default Question;
