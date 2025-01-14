import { useEffect, useState } from "react";
import styles from "./Timer.module.css";

type Props = {
  time: number;
};

const Timer = ({ time }: Props) => {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    if (timer === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [timer]);

  return (
    <div className={styles.timer}>
      <p>{timer}</p>
    </div>
  );
};

export default Timer;
