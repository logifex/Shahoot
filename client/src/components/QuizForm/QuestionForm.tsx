import Question from "../../types/question";
import LabelInput from "../ui/LabelInput/LabelInput";
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
          onChange={handleQuestionChange}
          value={question.question}
        />
      </div>
      <div>
        <p className={styles.label}>Answers</p>
        <div className={styles.answers}>
          {question.answers.map((a, i) => (
            <div key={i}>
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
        <button
          className={`${formStyles.btn} ${formStyles["btn-danger"]}`}
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
    </fieldset>
  );
};

export default QuestionForm;
