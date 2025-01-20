import styles from "./PlayerLayout.module.css";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  nickname: string;
  score: number;
  questionNumber: number;
}>;

const PlayerLayout = ({ nickname, score, questionNumber, children }: Props) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <p>{questionNumber}</p>
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <p className={styles.nickname}>{nickname}</p>
        <p className={styles.score}>{score}</p>
      </footer>
    </div>
  );
};

export default PlayerLayout;
