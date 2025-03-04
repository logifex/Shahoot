import socket from "../../../../config/socket";
import Game from "../../../../types/game";
import Button from "../../../ui/Button/Button";
import styles from "./Lobby.module.css";
import PlayerList from "../PlayerList/PlayerList";
import { useSearchParams } from "react-router";

type Props = {
  game: Game;
};

const Lobby = ({ game }: Props) => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("quiz");

  const handleStart = () => {
    socket.emit("nextQuestion", game.pin);
  };

  return (
    <div className={styles.container}>
      <div className={styles["pin-header"]}>
        <div className={styles["join-container"]}>
          <p>
            Join at
            <br />
            <span
              className={styles["url"]}
            >{`${window.location.hostname}/play`}</span>
          </p>
        </div>
        <div className={styles["pin-container"]}>
          <p>Game PIN</p>
          <p className={styles["pin-text"]}>{game.pin}</p>
        </div>
      </div>
      <div className={styles.lobby}>
        <div className={styles["players-header"]}>
          <div className={styles.spacer}>
            <Button variant="inverted" to={`/quiz/${quizId}`}>
              Go Back
            </Button>
          </div>
          <div className={styles.title}>
            <h2>Shahoot!</h2>
          </div>
          <div className={styles.buttons}>
            <Button
              variant="inverted"
              type="button"
              onClick={handleStart}
              disabled={game.players.length === 0}
            >
              Start Game
            </Button>
          </div>
        </div>
        <section className={styles["players-container"]}>
          <PlayerList players={game.players} />
        </section>
      </div>
    </div>
  );
};

export default Lobby;
