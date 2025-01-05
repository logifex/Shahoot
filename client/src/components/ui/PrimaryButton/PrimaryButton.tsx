import { PropsWithChildren } from "react";
import styles from "./PrimaryButton.module.css";

type Props = PropsWithChildren<{
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}>;

const PrimaryButton = ({ onClick, type, children }: Props) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default PrimaryButton;
