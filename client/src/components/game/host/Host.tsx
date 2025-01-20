import { useEffect, useState } from "react";
import Lobby from "./Lobby/Lobby";
import socket from "../../../config/socket";
import PrepareQuestion from "./PrepareQuestion/PrepareQuestion";
import Question from "./Question/Question";
import Leaderboard from "./Leaderboard/Leaderboard";
import QuestionType from "../../../types/question";
import Game from "../../../types/game";
import Player from "../../../types/player";
import { useSearchParams } from "react-router";
import HostLayout from "./HostLayout/HostLayout";

enum GameState {
  Lobby,
  PrepareQuestion,
  Question,
  QuestionResults,
  Leaderboard,
}

const Host = () => {
  const [game, setGame] = useState<Game>();
  const [gameState, setGameState] = useState<GameState>(GameState.Lobby);

  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("quiz");

  useEffect(() => {
    if (!game && quizId) {
      const gameCreated = (newPin: string, questions: QuestionType[]) => {
        setGame({
          pin: newPin,
          players: [],
          questions: questions,
          currentQuestionIndex: -1,
        });
      };
      socket.on("gameCreated", gameCreated);
      socket.emit("gameCreate", quizId);

      return () => {
        socket.off("gameCreated", gameCreated);
      };
    }
  }, [game, quizId]);

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
      setGame((prevGame) => prevGame && { ...prevGame, players: players });
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
    socket.on("disconnect", handleGameDisconnected);

    return () => {
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("prepareQuestion", prepareQuestion);
      socket.off("startQuestion", startQuestion);
      socket.off("revealAnswers", revealAnswers);
      socket.off("gameDisconnected", handleGameDisconnected);
      socket.off("disconnect", handleGameDisconnected);
    };
  }, []);

  if (!game) {
    return (
      <div>
        <p className="page-message">Loading...</p>
      </div>
    );
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
    <HostLayout
      gamePin={game.pin}
      questionNumber={game.currentQuestionIndex + 1}
      questionAmount={game.questions.length}
      gameStarted={game.currentQuestionIndex !== -1}
    >
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
    </HostLayout>
  );
};

export default Host;
