import { PropsWithChildren } from "react";
import styles from "./HostLayout.module.css";

type Props = PropsWithChildren<{
  gamePin: string;
  questionNumber: number;
  questionAmount: number;
  showFooter: boolean;
}>;

const HostLayout = ({
  gamePin,
  questionNumber,
  questionAmount,
  showFooter,
  children,
}: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>{children}</div>
      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles["footer-item"]}>
            <p>
              {questionNumber}/{questionAmount}
            </p>
          </div>
          <div className={`${styles["footer-item"]} ${styles.pin}`}>
            <p>Game PIN: {gamePin}</p>
          </div>
          <div className={styles["footer-item"]}></div>
        </footer>
      )}
    </div>
  );
};

export default HostLayout;
