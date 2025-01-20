import { useEffect, useState } from "react";
import JoinForm from "./JoinForm/JoinForm";
import socket from "../../../config/socket";
import PrepareQuestionTimer from "./PrepareQuestionTimer/PrepareQuestionTimer";
import Answers from "./Answers/Answers";
import AnswerButton from "./AnswerButton/AnswerButton";
import Waiting from "./Waiting/Waiting";
import QuestionResult from "./QuestionResult/QuestionResult";
import PlayerLayout from "./PlayerLayout/PlayerLayout";

enum GameState {
  Waiting,
  PrepareQuestion,
  Question,
  QuestionResults,
}

const Player = () => {
  const [pin, setPin] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [score, setScore] = useState(0);
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

    const revealResult = (
      correct: boolean,
      score: number,
      totalScore: number
    ) => {
      setGameState(GameState.QuestionResults);
      setRound({ correct: correct, score: score });
      setScore(totalScore);
    };

    const handleGameDisconnected = () => {
      setPin(undefined);
      setScore(0);
      setQuestionIndex(0);
      setGameState(GameState.Waiting);
    };

    socket.on("joinSuccess", handleJoined);
    socket.on("prepareQuestion", prepareQuestion);
    socket.on("startQuestion", startQuestion);
    socket.on("revealResult", revealResult);
    socket.on("gameDisconnected", handleGameDisconnected);
    socket.on("disconnect", handleGameDisconnected);

    return () => {
      socket.off("joinSuccess", handleJoined);
      socket.off("prepareQuestion", prepareQuestion);
      socket.off("startQuestion", startQuestion);
      socket.off("revealResult", revealResult);
      socket.off("gameDisconnected", handleGameDisconnected);
      socket.off("disconnect", handleGameDisconnected);
    };
  }, []);

  if (!pin || !nickname) {
    return <JoinForm onSubmit={handleJoin} />;
  }

  const handleAnswer = (index: number) => {
    socket.emit("playerAnswer", pin, index);
    setChosenAnswerIndex(index);
  };

  return (
    <PlayerLayout
      nickname={nickname}
      score={score}
      questionNumber={questionIndex + 1}
    >
      {gameState === GameState.Waiting && <Waiting nickname={nickname} />}
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
    </PlayerLayout>
  );
};

export default Player;
