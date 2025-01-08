import { InputHTMLAttributes } from "react";
import styles from "./LabelInput.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const LabelInput = ({ label, ...props }: Props) => {
  const input = <input className={styles.input} {...props} />;

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
