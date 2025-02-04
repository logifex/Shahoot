import { InputHTMLAttributes } from "react";
import styles from "./LabelInput.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

const LabelInput = ({ label, error, ...props }: Props) => {
  const input = (
    <input
      className={`${styles.input}${error ? ` ${styles.error}` : ""}`}
      {...props}
    />
  );

  return label ? (
    <label>
      <p className={styles.label}>{label}</p>
      {input}
    </label>
  ) : (
    input
  );
};

export default LabelInput;
