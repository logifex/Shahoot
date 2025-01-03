import { Route, Routes } from "react-router";
import styles from "./App.module.css";
import Player from "./components/game/Player";
import Host from "./components/game/host/Host";

function App() {
  return (
    <div className={styles["app-container"]}>
      <main>
        <Routes>
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
