import Answer from "../Answer/Answer";
import QuestionType from "../../../../types/question";
import styles from "./Question.module.css";
import Button from "../../../ui/Button/Button";
import Timer from "../../Timer/Timer";
import { useEffect, useState } from "react";
import socket from "../../../../config/socket";

type Props = {
  question: QuestionType;
  showAnswers: boolean;
  onNext: () => void;
};

const Question = ({ question, showAnswers, onNext }: Props) => {
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    const handleAnswered = () => {
      setAnswered((prevAnswered) => prevAnswered + 1);
    };

    socket.on("playerAnswered", handleAnswered);

    return () => {
      socket.off("playerAnswered", handleAnswered);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{question.question}</h2>
      <div className={styles.header}>
        <div className={styles.answered}>
          <p>{answered}</p>
          <p>Answered</p>
        </div>
        {!showAnswers && <Timer time={10} />}
      </div>
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
