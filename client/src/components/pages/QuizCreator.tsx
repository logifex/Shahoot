import { useEffect, useState } from "react";
import styles from "./QuizCreator.module.css";
import { QuizInput } from "../../types/quiz";
import { useNavigate, useParams } from "react-router";
import QuizService from "../../services/QuizService";
import QuestionForm from "../QuizForm/QuestionForm";
import Question from "../../types/question";
import LabelInput from "../QuizForm/LabelInput";

const MAX_TITLE_LENGTH = 120;
const MAX_QUESTION_AMOUNT = 99;

const QuizCreator = () => {
  const navigate = useNavigate();
  const { quizId } = useParams() as { quizId?: string };

  const [quizInput, setQuizInput] = useState<QuizInput>({
    title: "",
    questions: [
      {
        question: "",
        answers: [
          { answer: "", correct: false },
          { answer: "", correct: false },
          { answer: "", correct: false },
          { answer: "", correct: false },
        ],
      },
    ],
  });

  useEffect(() => {
    if (!quizId) {
      return;
    }

    const fetchQuiz = async () => {
      const fetchedQuiz = await QuizService.getQuiz(quizId);
      setQuizInput({
        title: fetchedQuiz.title,
        questions: fetchedQuiz.questions,
      });
    };

    fetchQuiz();
  }, [quizId]);

  const handleAddQuestion = () => {
    setQuizInput((prevInput) => ({
      ...prevInput,
      questions: [
        ...prevInput.questions,
        {
          question: "",
          answers: [
            { answer: "", correct: false },
            { answer: "", correct: false },
            { answer: "", correct: false },
            { answer: "", correct: false },
          ],
        },
      ],
    }));
  };

  const handleDeleteQuestion = (index: number) => {
    setQuizInput((prevInput) => {
      const updatedQuestions = prevInput.questions.slice();
      updatedQuestions.splice(index, 1);
      return {
        ...prevInput,
        questions: updatedQuestions,
      };
    });
  };

  const handleQuestionChange = (index: number, question: Question) => {
    setQuizInput((prevQuiz) => {
      const updatedQuestions = prevQuiz.questions.slice();
      updatedQuestions[index] = question;
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuizInput((prevQuiz) => ({ ...prevQuiz, title: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO display errors

    const newQuiz: QuizInput = {
      ...quizInput,
      questions: quizInput.questions.map((q) => ({
        ...q,
        answers: q.answers.filter((a, i) => i <= 1 || a.answer !== ""),
      })),
    };

    if (quizId) {
      await QuizService.updateQuiz(quizId, newQuiz);
      navigate(`/quiz/${quizId}`);
    } else {
      const createdQuiz = await QuizService.createQuiz(newQuiz);
      navigate(`/quiz/${createdQuiz._id}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{quizId ? "Edit Quiz" : "Create Quiz"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <LabelInput
            label="Title"
            type="text"
            required
            maxLength={MAX_TITLE_LENGTH}
            onChange={handleTitleChange}
            value={quizInput.title}
          />
        </div>
        <div className={styles["questions-section"]}>
          <h3>Questions</h3>
          <div>
            {quizInput.questions.map((q, i) => (
              <QuestionForm
                key={i}
                question={q}
                number={i + 1}
                onChange={(question) => handleQuestionChange(i, question)}
                onDelete={
                  quizInput.questions.length > 1
                    ? () => handleDeleteQuestion(i)
                    : undefined
                }
                formStyles={styles}
              />
            ))}
          </div>
          <button
            className={`${styles.btn} ${styles["btn-add"]}`}
            type="button"
            onClick={handleAddQuestion}
            disabled={quizInput.questions.length >= MAX_QUESTION_AMOUNT}
          >
            + Add Question
          </button>
        </div>
        <div className={styles["form-actions"]}>
          <button
            className={`${styles.btn} ${styles["btn-primary"]}`}
            type="submit"
          >
            Save Quiz
          </button>
          <button
            className={`${styles.btn} ${styles["btn-danger"]}`}
            type="button"
            onClick={() => {
              navigate(quizId ? `/quiz/${quizId}` : "/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizCreator;