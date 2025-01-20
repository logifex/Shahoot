import IAnswer from "./answer";

interface IQuestion {
  question: string;
  timer: number;
  answers: IAnswer[];
}

export default IQuestion;
