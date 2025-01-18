import Question from "../../types/question";
import LabelInput from "../ui/LabelInput/LabelInput";
import Button from "../ui/Button/Button";
import styles from "./QuestionForm.module.css";

type Props = {
  question: Question;
  number: number;
  onChange: (question: Question) => void;
  onDelete?: () => void;
  formStyles: CSSModuleClasses;
};

const MAX_QUESTION_LENGTH = 120;
const MAX_ANSWER_LENGTH = 75;

const QuestionForm = ({
  question,
  number,
  onChange,
  onDelete,
  formStyles,
}: Props) => {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = { ...question, question: e.target.value };
    onChange(updatedQuestion);
  };

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = { ...question, time: +e.target.value };
    onChange(updatedQuestion);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = question.answers.slice();
    updatedAnswers[index] = { ...updatedAnswers[index], answer: value };
    onChange({ ...question, answers: updatedAnswers });
  };

  const handleCorrectChange = (index: number, checked: boolean) => {
    const updatedAnswers = question.answers.slice();
    updatedAnswers[index] = { ...updatedAnswers[index], correct: checked };
    onChange({ ...question, answers: updatedAnswers });
  };

  return (
    <fieldset className={styles["question-item"]}>
      <legend>Question {number}</legend>
      <div className={formStyles["form-group"]}>
        <LabelInput
          type="text"
          required
          maxLength={MAX_QUESTION_LENGTH}
          placeholder="Question"
          onChange={handleQuestionChange}
          value={question.question}
        />
      </div>
      <div className={formStyles["form-group"]}>
        <LabelInput
          label="Time Limit (Seconds)"
          min={5}
          max={240}
          type="number"
          required
          onChange={handleTimeLimitChange}
          value={question.time}
        />
      </div>
      <div>
        <p className={styles.label}>Answers</p>
        <div className={styles.answers}>
          {question.answers.map((a, i) => (
            <div className={styles.answer} key={i}>
              <LabelInput
                type="text"
                required={i <= 1}
                maxLength={MAX_ANSWER_LENGTH}
                placeholder={`Answer ${i + 1}${i > 1 ? " (Optional)" : ""}`}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                value={a.answer}
              />
              <input
                type="checkbox"
                title="Correct"
                onChange={(e) => handleCorrectChange(i, e.target.checked)}
                checked={a.correct}
              />
            </div>
          ))}
        </div>
      </div>
      {onDelete && (
        <Button variant="danger" type="button" onClick={onDelete}>
          Delete
        </Button>
      )}
    </fieldset>
  );
};

export default QuestionForm;
