import useTimer from "../../../../hooks/useTimer";
import Answer from "../Answer/Answer";
import QuestionType from "../../../../types/question";
import styles from "./Question.module.css";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";

type Props = {
  question: QuestionType;
  showAnswers: boolean;
  onNext: () => void;
};

const Question = ({ question, showAnswers, onNext }: Props) => {
  const timer = useTimer(10);

  return (
    <div className="flex-center">
      {!showAnswers && <p>{timer}</p>}
      <h2>{question.question}</h2>
      <div className={styles["answers-container"]}>
        <ol className={styles.answers}>
          {question.answers.map((a, i) => (
            <li key={a.answer}>
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
      <PrimaryButton type="button" onClick={onNext}>
        Next
      </PrimaryButton>
    </div>
  );
};

export default Question;
