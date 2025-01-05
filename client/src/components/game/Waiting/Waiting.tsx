import styles from "./Waiting.module.css";

type Props = { nickname: string };

const Waiting = ({ nickname }: Props) => {
  return (
    <div className="flex-center">
      <p className={styles.nickname}>{nickname}</p>
      <p className={styles.message}>You're in! Wait for the game to start.</p>
    </div>
  );
};

export default Waiting;
