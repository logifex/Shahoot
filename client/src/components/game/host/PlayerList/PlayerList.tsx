import Player from "../../../../types/player";
import styles from "./PlayerList.module.css";

type Props = { players: Player[] };

const PlayerList = ({ players }: Props) => {
  return (
    <ul>
      {players.length === 0 && <p className={styles.message}>No players have joined yet.</p>}
      {players.map((p) => (
        <li key={p.id}>
          <div className={styles.player}>
            <p>{p.nickname}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
