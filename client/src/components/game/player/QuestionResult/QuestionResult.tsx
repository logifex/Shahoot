import Player from "../../../../types/player";
import styles from "./QuestionResult.module.css";

type Props = {
  correct: boolean;
  score: number;
  rank: number;
  leadingUser?: Player;
  totalScore: number;
};

const QuestionResult = ({
  correct,
  score,
  rank,
  leadingUser,
  totalScore,
}: Props) => {
  const leadingScoreDifference = leadingUser
    ? leadingUser.score - totalScore
    : undefined;

  const containerClass = correct
    ? styles["container-correct"]
    : styles["container-incorrect"];

  return (
    <div className={`${styles.container} ${containerClass}`}>
      <p className={styles["result-text"]}>
        {correct ? `Correct! Score +${score}` : "Incorrect..."}
      </p>
      <p className={styles["rank-text"]}>You are ranked #{rank}.</p>
      {leadingUser && (
        <p className={styles["rank-text"]}>
          {leadingScoreDifference} points behind {leadingUser.nickname}.
        </p>
      )}
    </div>
  );
};

export default QuestionResult;
