import { useEffect, useState } from "react";

const useTimer = (time: number) => {
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

  return timer;
};

export default useTimer;
