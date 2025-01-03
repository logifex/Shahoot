type Props = { index: number; onAnswer?: (index: number) => void };

const QuestionButton = ({ index, onAnswer }: Props) => {
  return (
    <button
      type="button"
      disabled={!onAnswer}
      onClick={() => onAnswer?.call(this, index)}
    >
      {index + 1}
    </button>
  );
};

export default QuestionButton;
