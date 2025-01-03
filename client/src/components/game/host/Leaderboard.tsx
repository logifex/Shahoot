import Player from "../../../types/player";

type Props = { players: Player[]; hasNext: boolean; onNext: () => void };

const Leaderboard = ({ players, hasNext, onNext }: Props) => {
  return (
    <div>
      <ol>
        {players
          .sort((a, b) => a.score - b.score)
          .map((p) => (
            <div key={p.id}>
              <p>{p.nickname}</p>
              <p>{p.score}</p>
            </div>
          ))}
      </ol>
      {hasNext && (
        <button type="button" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Leaderboard;
