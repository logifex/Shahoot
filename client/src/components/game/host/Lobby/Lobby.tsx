import socket from "../../../../config/socket";
import Game from "../../../../types/game";
import Button from "../../../ui/Button/Button";
import styles from "./Lobby.module.css";
import PlayerList from "../PlayerList/PlayerList";

type Props = {
  game: Game;
};

const Lobby = ({ game }: Props) => {
  const handleStart = () => {
    socket.emit("nextQuestion", game.pin);
  };

  return (
    <div className={styles.container}>
      <div className={styles["pin-container"]}>
        <p>Game PIN</p>
        <p className={styles["pin-text"]}>{game.pin}</p>
      </div>
      <div className={styles.lobby}>
        <div className={styles.header}>
          <div className={styles.spacer}></div>
          <div className={styles.title}>
            <h2>Shahoot!</h2>
          </div>
          <div className={styles.buttons}>
            <Button
              variant="inverted"
              type="button"
              onClick={handleStart}
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
