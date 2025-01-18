import IAnswer from "./answer";

interface IQuestion {
  question: string;
  time: number;
  answers: IAnswer[];
}

export default IQuestion;
