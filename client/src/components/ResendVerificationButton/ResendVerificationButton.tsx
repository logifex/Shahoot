import { useState } from "react";
import AuthService from "../../services/AuthService";
import styles from "./ResendVerificationButton.module.css";

const SEND_TIMEOUT = 60 * 1000;

type Props = {
  username: string;
};

const ResendVerificationButton = ({ username }: Props) => {
  const [active, setActive] = useState(true);

  const handleClick = async () => {
    setActive(false);
    setTimeout(() => {
      setActive(true);
    }, SEND_TIMEOUT);
    
    await AuthService.resendVerificationEmail(username);
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleClick}
      disabled={!active}
    >
      Resend Email
    </button>
  );
};

export default ResendVerificationButton;
