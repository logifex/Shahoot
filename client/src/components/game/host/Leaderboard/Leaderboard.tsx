import { useSearchParams } from "react-router";
import Player from "../../../../types/player";
import Button from "../../../ui/Button/Button";
import styles from "./Leaderboard.module.css";

type Props = {
  players: Player[];
  hasNext: boolean;
  onNext: () => void;
};

const Leaderboard = ({ players, hasNext, onNext }: Props) => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("quiz");

  const getScoreBackgroundClass = (index: number): string => {
    if (index === 0) {
      return " " + styles["first-place"];
    }
    if (index === 1) {
      return " " + styles["second-place"];
    }
    if (index === 2) {
      return " " + styles["third-place"];
    }

    return "";
  };

  return (
    <>
      {!hasNext && (
        <div className={styles["quiz-end"]}>
          <p>
            Quiz Finished!
            <br />
            See the Results
          </p>
        </div>
      )}
      <ol className={styles.scoreboard}>
        {players
          .sort((a, b) => b.score - a.score)
          .map((p, i) => (
            <li key={p.id}>
              <div
                className={`${styles["score-item"]}${getScoreBackgroundClass(
                  i
                )}`}
              >
                <p>{p.nickname}</p>
                <p>{p.score}</p>
              </div>
            </li>
          ))}
      </ol>
      {hasNext && (
        <Button variant="primary" type="button" onClick={onNext}>
          Next
        </Button>
      )}
      {!hasNext && (
        <Button variant="secondary" to={`/quiz/${quizId}`}>
          Finish
        </Button>
      )}
    </>
  );
};

export default Leaderboard;
