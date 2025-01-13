import { useRef } from "react";
import styles from "./JoinForm.module.css";

const MAX_NICKNAME_LENGTH = 20;

type Props = {
  onSubmit: (pin: string, nickname: string) => void;
};

const JoinForm = ({ onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pin = pinRef.current?.value;
    const name = nameRef.current?.value;

    if (!pin || pin === "" || !name || name === "") {
      return;
    }

    onSubmit(pin, name);
  };

  const pinRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex-center">
      <div>
        <p>Shahoot!</p>
      </div>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <input ref={pinRef} type="text" placeholder="Game PIN" />
            <input
              ref={nameRef}
              type="text"
              placeholder="Nickname"
              maxLength={MAX_NICKNAME_LENGTH}
            />
            <button type="submit">Enter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
