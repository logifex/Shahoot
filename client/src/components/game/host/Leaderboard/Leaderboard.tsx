import Player from "../../../../types/player";
import Button from "../../../ui/Button/Button";
import styles from "./Leaderboard.module.css";

type Props = { players: Player[]; hasNext: boolean; onNext: () => void };

const Leaderboard = ({ players, hasNext, onNext }: Props) => {
  return (
    <>
      <ol className={styles.scoreboard}>
        {players
          .sort((a, b) => b.score - a.score)
          .map((p) => (
            <li key={p.id}>
              <div className={styles["score-item"]}>
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
    </>
  );
};

export default Leaderboard;
