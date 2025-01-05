import { useEffect, useState } from "react";
import JoinForm from "./JoinForm/JoinForm";
import socket from "../../config/socket";
import PrepareQuestionTimer from "./PrepareQuestionTimer/PrepareQuestionTimer";
import Answers from "./Answers/Answers";
import AnswerButton from "./AnswerButton/AnswerButton";
import Waiting from "./Waiting/Waiting";
import QuestionResult from "./QuestionResult/QuestionResult";

enum GameState {
  Waiting,
  PrepareQuestion,
  Question,
  QuestionResults,
}

const Player = () => {
  const [pin, setPin] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerAmount, setAnswerAmount] = useState(0);
  const [chosenAnswerIndex, setChosenAnswerIndex] = useState<number>();
  const [round, setRound] = useState<{ correct: boolean; score: number }>();
  const [gameState, setGameState] = useState<GameState>(GameState.Waiting);

  const handleJoin = (pin: string, nickname: string) => {
    socket.emit("playerJoin", pin, nickname);
    setNickname(nickname);
  };

  useEffect(() => {
    const handleJoined = (pin: string) => {
      setPin(pin);
    };

    const prepareQuestion = (index: number, amount: number) => {
      setChosenAnswerIndex(undefined);
      setRound(undefined);
      setQuestionIndex(index);
      setAnswerAmount(amount);
      setGameState(GameState.PrepareQuestion);
    };

    const startQuestion = () => {
      setGameState(GameState.Question);
    };

    const revealResult = (correct: boolean, score: number) => {
      setGameState(GameState.QuestionResults);
      setRound({ correct: correct, score: score });
    };

    const handleGameDisconnected = () => {
      setPin(undefined);
      setGameState(GameState.Waiting);
    };

    socket.on("joinSuccess", handleJoined);
    socket.on("prepareQuestion", prepareQuestion);
    socket.on("startQuestion", startQuestion);
    socket.on("revealResult", revealResult);
    socket.on("gameDisconnected", handleGameDisconnected);

    return () => {
      socket.off("joinSuccess", handleJoined);
      socket.off("prepareQuestion", prepareQuestion);
      socket.off("startQuestion", startQuestion);
      socket.off("revealResult", revealResult);
      socket.off("gameDisconnected", handleGameDisconnected);
    };
  }, []);

  if (!pin) {
    return <JoinForm onSubmit={handleJoin} />;
  }

  const handleAnswer = (index: number) => {
    socket.emit("playerAnswer", pin, index);
    setChosenAnswerIndex(index);
  };

  return (
    <>
      {gameState === GameState.Waiting && nickname && (
        <Waiting nickname={nickname} />
      )}
      {gameState === GameState.PrepareQuestion && (
        <PrepareQuestionTimer questionNumber={questionIndex + 1} />
      )}
      {gameState === GameState.Question &&
        (chosenAnswerIndex === undefined ? (
          <Answers amount={answerAmount} onAnswer={handleAnswer} />
        ) : (
          <AnswerButton index={chosenAnswerIndex} />
        ))}
      {gameState === GameState.QuestionResults && (
        <QuestionResult correct={!!round?.correct} score={round?.score ?? 0} />
      )}
    </>
  );
};

export default Player;
