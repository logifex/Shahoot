import { useEffect, useState } from "react";
import Lobby from "./Lobby/Lobby";
import socket from "../../../config/socket";
import PrepareQuestion from "./PrepareQuestion/PrepareQuestion";
import Question from "./Question/Question";
import Leaderboard from "./Leaderboard/Leaderboard";
import QuestionType from "../../../types/question";
import Game from "../../../types/game";
import Player from "../../../types/player";

enum GameState {
  Lobby,
  PrepareQuestion,
  Question,
  QuestionResults,
  Leaderboard,
  Results,
}

const Host = () => {
  const [game, setGame] = useState<Game>();
  const [gameState, setGameState] = useState<GameState>(GameState.Lobby);

  useEffect(() => {
    if (!game) {
      const gameCreated = (newPin: string, questions: QuestionType[]) => {
        setGame({
          pin: newPin,
          players: [],
          questions: questions,
          currentQuestionIndex: 0,
        });
      };
      socket.on("gameCreated", gameCreated);
      socket.emit("gameCreate");

      return () => {
        socket.off("gameCreated", gameCreated);
      };
    }
  }, [game]);

  useEffect(() => {
    const handlePlayerJoined = (player: Player) => {
      setGame(
        (prevGame) =>
          prevGame && {
            ...prevGame,
            players: prevGame.players
              .filter((p) => p.id !== player.id)
              .concat(player),
          }
      );
    };

    const prepareQuestion = (index: number) => {
      setGame(
        (prevGame) => prevGame && { ...prevGame, currentQuestionIndex: index }
      );
      setGameState(GameState.PrepareQuestion);
    };

    const startQuestion = () => {
      setGameState(GameState.Question);
    };

    const revealAnswers = (players: Player[]) => {
      setGame((prevGame) => prevGame && { ...prevGame, players });
      setGameState(GameState.QuestionResults);
    };

    const handleGameDisconnected = () => {
      setGameState(GameState.Lobby);
      setGame(undefined);
    };

    socket.on("playerJoined", handlePlayerJoined);
    socket.on("prepareQuestion", prepareQuestion);
    socket.on("startQuestion", startQuestion);
    socket.on("revealAnswers", revealAnswers);
    socket.on("gameDisconnected", handleGameDisconnected);

    return () => {
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("prepareQuestion", prepareQuestion);
      socket.off("startQuestion", startQuestion);
      socket.off("revealAnswers", revealAnswers);
      socket.off("gameDisconnected", handleGameDisconnected);
    };
  }, []);

  if (!game) {
    return <div></div>;
  }

  const handleLeaderboard = () => {
    setGameState(GameState.Leaderboard);
  };

  const handleSkip = () => {
    socket.emit("skip", game.pin);
  };

  const handleNextQuestion = () => {
    socket.emit("nextQuestion", game.pin);
  };

  const currentQuestion = game.questions[game.currentQuestionIndex];

  return (
    <>
      {gameState === GameState.Lobby && <Lobby game={game} />}
      {gameState === GameState.PrepareQuestion && (
        <PrepareQuestion
          questionNumber={game.currentQuestionIndex + 1}
          question={currentQuestion.question}
        />
      )}
      {(gameState === GameState.Question ||
        gameState === GameState.QuestionResults) && (
        <Question
          question={currentQuestion}
          showAnswers={gameState === GameState.QuestionResults}
          onNext={
            gameState === GameState.QuestionResults
              ? handleLeaderboard
              : handleSkip
          }
        />
      )}
      {gameState === GameState.Leaderboard && (
        <Leaderboard
          players={game.players}
          hasNext={game.currentQuestionIndex < game.questions.length - 1}
          onNext={handleNextQuestion}
        />
      )}
    </>
  );
};

export default Host;
