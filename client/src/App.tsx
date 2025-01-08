import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import Player from "./components/game/Player";
import Host from "./components/game/host/Host";
import MainLayout from "./components/layout/MainLayout";
import QuizzesPage from "./components/pages/QuizzesPage";
import QuizPage from "./components/pages/QuizPage";
import QuizCreator from "./components/pages/QuizCreator";

function App() {
  return (
    <div className={styles["app-container"]}>
      <main>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<QuizzesPage />} />
            <Route path="creator">
              <Route index element={<QuizCreator />} />
              <Route path=":quizId" element={<QuizCreator />} />
            </Route>
            <Route path="quiz/:quizId" element={<QuizPage />} />
          </Route>
          <Route path="play">
            <Route index element={<Player />} />
            <Route path="host" element={<Host />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
