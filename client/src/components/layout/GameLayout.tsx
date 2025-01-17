import { Link, Outlet } from "react-router";
import useSocket from "../../hooks/useSocket";
import { useEffect, useState } from "react";
import socket from "../../config/socket";
import styles from "./GameLayout.module.css";

const GameLayout = () => {
  const [errorMessage, setErrorMessage] = useState<string>();

  useSocket();

  useEffect(() => {
    const handleError = (message: string) => {
      setErrorMessage(message);
    };

    socket.on("error", handleError);

    return () => {
      socket.off("error", handleError);
    };
  }, []);

  return errorMessage ? (
    <div className={styles["error-container"]}>
      <p>{errorMessage}</p>
      <Link className="link" to="/">
        Return to main page
      </Link>
    </div>
  ) : (
    <Outlet />
  );
};

export default GameLayout;
