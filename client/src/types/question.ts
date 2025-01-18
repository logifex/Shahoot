type Question = {
  question: string;
  time: number;
  answers: { answer: string; correct: boolean }[];
};

export default Question;
