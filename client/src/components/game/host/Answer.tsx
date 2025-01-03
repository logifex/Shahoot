import styles from "./Question.module.css";

type Props = {
  text: string;
  isCorrect: boolean;
};

const Answer = ({ text, isCorrect }: Props) => {
  return <p style={isCorrect ? { fontWeight: "bold" } : undefined}>{text}</p>;
};

export default Answer;
