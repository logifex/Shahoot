type Question = {
  question: string;
  timer: number;
  answers: { answer: string; correct: boolean }[];
};

export default Question;
