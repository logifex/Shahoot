type Props = { question: string; questionNumber: number };

const PrepareQuestion = ({ question, questionNumber }: Props) => {
  return (
    <div>
      <p>Question {questionNumber}</p>
      <p>{question}</p>
    </div>
  );
};

export default PrepareQuestion;
