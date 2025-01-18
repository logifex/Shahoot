import { useContext, useEffect, useState } from "react";
import styles from "./QuizCreator.module.css";
import { QuizInput } from "../../types/quiz";
import { useNavigate, useParams } from "react-router";
import QuizService from "../../services/QuizService";
import QuestionForm from "../QuizForm/QuestionForm";
import Question from "../../types/question";
import LabelInput from "../ui/LabelInput/LabelInput";
import AuthContext from "../../context/AuthContext";
import { AxiosError } from "axios";
import BackendError from "../../types/error";
import Button from "../ui/Button/Button";

const MAX_TITLE_LENGTH = 120;
const MAX_QUESTION_AMOUNT = 99;
const DEFAULT_QUESTION_TIME = 10;

const QuizCreator = () => {
  const { ready, userData } = useContext(AuthContext);

  const navigate = useNavigate();

  const { quizId } = useParams() as { quizId?: string };

  const [quizInput, setQuizInput] = useState<QuizInput>({
    title: "",
    questions: [
      {
        question: "",
        time: DEFAULT_QUESTION_TIME,
        answers: [
          { answer: "", correct: false },
          { answer: "", correct: false },
          { answer: "", correct: false },
          { answer: "", correct: false },
        ],
      },
    ],
  });
  const [apiError, setApiError] = useState<AxiosError<BackendError>>();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!quizId) {
      return;
    }

    const fetchQuiz = async () => {
      setFetchLoading(true);
      const fetchedQuiz = await QuizService.getQuiz(quizId);
      setQuizInput({
        title: fetchedQuiz.title,
        questions: fetchedQuiz.questions,
      });
      setFetchLoading(false);

      const quizCreator = fetchedQuiz.user as { _id: string; username: string };
      if (quizCreator._id !== userData?.user._id) {
        navigate(`/quiz/${quizId}`);
      }
    };

    if (ready) {
      fetchQuiz();
    }
  }, [quizId, ready, userData, navigate]);

  const handleAddQuestion = () => {
    setQuizInput((prevInput) => ({
      ...prevInput,
      questions: [
        ...prevInput.questions,
        {
          question: "",
          time: DEFAULT_QUESTION_TIME,
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

  if (!userData) {
    return;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newQuiz: QuizInput = {
      ...quizInput,
      questions: quizInput.questions.map((q) => ({
        ...q,
        answers: q.answers.filter((a, i) => i <= 1 || a.answer !== ""),
      })),
    };

    try {
      setFormLoading(true);
      if (quizId) {
        await QuizService.updateQuiz(quizId, newQuiz, userData.token);
        navigate(`/quiz/${quizId}`);
      } else {
        const createdQuiz = await QuizService.createQuiz(
          newQuiz,
          userData.token
        );
        navigate(`/quiz/${createdQuiz._id}`);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setApiError(err);
      }
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const errors = apiError?.response?.data.errors;
  const hasAnswersError =
    errors && errors.some((e) => e.path.endsWith("answers"));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{quizId ? "Edit Quiz" : "Create Quiz"}</h1>
      {apiError &&
        (hasAnswersError ? (
          <p className={styles["error-message"]}>
            Make sure each question has at least one correct answer.
          </p>
        ) : (
          <p className={styles["error-message"]}>Error trying to submit.</p>
        ))}
      {fetchLoading && <p>Loading...</p>}
      {!fetchLoading && (
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
            <Button
              variant="secondary"
              type="button"
              onClick={handleAddQuestion}
              disabled={quizInput.questions.length >= MAX_QUESTION_AMOUNT}
            >
              + Add Question
            </Button>
          </div>
          <div className={styles["form-actions"]}>
            <Button variant="primary" type="submit" disabled={formLoading}>
              Save Quiz
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => {
                navigate(quizId ? `/quiz/${quizId}` : "/");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QuizCreator;
