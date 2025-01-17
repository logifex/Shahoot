import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import Player from "./components/game/Player";
import Host from "./components/game/host/Host";
import MainLayout from "./components/layout/MainLayout";
import QuizzesPage from "./components/pages/QuizzesPage";
import QuizPage from "./components/pages/QuizPage";
import QuizCreator from "./components/pages/QuizCreator";
import ProtectedRouteLayout from "./components/layout/ProtectedRouteLayout";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import VerificationAction from "./components/pages/VerificationAction";
import GameLayout from "./components/layout/GameLayout";

function App() {
  return (
    <div className={styles["app-container"]}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<ProtectedRouteLayout />}>
            <Route index element={<QuizzesPage />} />
            <Route path="creator">
              <Route index element={<QuizCreator />} />
              <Route path=":quizId" element={<QuizCreator />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="verify"
            element={<VerificationAction action="verify" />}
          />
          <Route
            path="cancel-verification"
            element={<VerificationAction action="cancel" />}
          />
          <Route path="quiz/:quizId" element={<QuizPage />} />
        </Route>
        <Route path="play" element={<GameLayout />}>
          <Route index element={<Player />} />
          <Route path="host" element={<Host />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
