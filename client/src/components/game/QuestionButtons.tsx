import QuestionButton from "./QuestionButton";

type Props = { amount: number; onAnswer: (index: number) => void };

const QuestionButtons = ({ amount, onAnswer }: Props) => {
  const buttons = [];

  for (let i = 0; i < amount; i++) {
    buttons.push(
      <li>
        <QuestionButton key={i} index={i} onAnswer={onAnswer} />
      </li>
    );
  }

  return <ul>{buttons}</ul>;
};

export default QuestionButtons;
