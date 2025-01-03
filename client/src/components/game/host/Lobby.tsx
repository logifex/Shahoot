import socket from "../../../config/socket";
import Game from "../../../types/game";

type Props = {
  game: Game;
};

const Lobby = ({ game }: Props) => {
  const handleStart = () => {
    socket.emit("nextQuestion", game.pin);
  };

  return (
    <div>
      <div>
        <p>Shahoot!</p>
      </div>
      <div>
        <p>Game PIN: {game.pin}</p>
      </div>
      <div>
        <p>Players:</p>
        <ul>
          {game.players.map((p) => (
            <li key={p.id}>{p.nickname}</li>
          ))}
        </ul>
      </div>
      <div>
        <button type="button" onClick={handleStart}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Lobby;
