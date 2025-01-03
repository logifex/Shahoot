import Question from "question";

const DUMMY_QUESTIONS: Question[] = [
  {
    question: "What is the capital of France?",
    answers: [
      { answer: "Paris", correct: true },
      { answer: "London", correct: false },
      { answer: "Rome", correct: false },
      { answer: "Berlin", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { answer: "Mars", correct: true },
      { answer: "Earth", correct: false },
      { answer: "Venus", correct: false },
      { answer: "Jupiter", correct: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { answer: "3", correct: false },
      { answer: "4", correct: true },
      { answer: "5", correct: false },
      { answer: "6", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { answer: "Atlantic Ocean", correct: false },
      { answer: "Indian Ocean", correct: false },
      { answer: "Arctic Ocean", correct: false },
      { answer: "Pacific Ocean", correct: true },
    ],
  },
];

export default DUMMY_QUESTIONS;
