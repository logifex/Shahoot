import { Link, Outlet } from "react-router";
import styles from "./MainLayout.module.css";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../ui/Button/Button";

const MainLayout = () => {
  const { userData, signOut } = useContext(AuthContext);

  return (
    <div className={styles.layout}>
      <header>
        <nav className={styles.navbar}>
          <Link to="/">
            <div className={styles.title}>
              <p>Shahoot!</p>
            </div>
          </Link>
          <div className={styles.buttons}>
            <Link className={styles.link} to="/play">
              Play
            </Link>
            <div className={styles["user-info"]}>
              {userData && (
                <p className={styles["user-message"]}>
                  Welcome, {userData.user.username}
                </p>
              )}
              <Button
                variant="inverted"
                className={styles["login-btn"]}
                type="button"
                onClick={userData ? signOut : undefined}
                to={!userData ? "/login" : undefined}
              >
                {userData ? "Logout" : "Login"}
              </Button>
            </div>
          </div>
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
