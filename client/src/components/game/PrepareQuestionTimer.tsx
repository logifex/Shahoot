import useTimer from "../../hooks/useTimer";

type Props = { questionNumber: number };

const PrepareQuestionTimer = ({ questionNumber }: Props) => {
  const timer = useTimer(5);

  return (
    <div>
      <p>{timer}</p>
      <p>Question {questionNumber}</p>
    </div>
  );
};

export default PrepareQuestionTimer;
