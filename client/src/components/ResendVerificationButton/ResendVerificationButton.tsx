import { useState } from "react";
import AuthService from "../../services/AuthService";
import Button from "../ui/Button/Button";

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
    <Button
      variant="secondary"
      type="button"
      onClick={handleClick}
      disabled={!active}
    >
      Resend Email
    </Button>
  );
};

export default ResendVerificationButton;
