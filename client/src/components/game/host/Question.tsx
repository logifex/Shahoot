import useTimer from "../../../hooks/useTimer";
import Answer from "./Answer";
import QuestionType from "../../../types/question";

type Props = {
  question: QuestionType;
  showAnswers: boolean;
  onNext: () => void;
};

const Question = ({ question, showAnswers, onNext }: Props) => {
  const timer = useTimer(10);

  return (
    <div>
      {!showAnswers && <p>{timer}</p>}
      <h2>{question.question}</h2>
      <div>
        <ul>
          {question.answers.map((a) => (
            <li key={a.answer}>
              <Answer
                key={a.answer}
                text={a.answer}
                isCorrect={showAnswers && a.correct}
              />
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default Question;
