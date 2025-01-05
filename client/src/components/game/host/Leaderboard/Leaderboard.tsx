import Player from "../../../../types/player";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import styles from "./Leaderboard.module.css";

type Props = { players: Player[]; hasNext: boolean; onNext: () => void };

const Leaderboard = ({ players, hasNext, onNext }: Props) => {
  return (
    <div className="flex-center">
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
        <PrimaryButton type="button" onClick={onNext}>
          Next
        </PrimaryButton>
      )}
    </div>
  );
};

export default Leaderboard;
