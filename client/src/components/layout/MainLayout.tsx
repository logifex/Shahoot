import { Link, Outlet, useNavigate } from "react-router";
import styles from "./MainLayout.module.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "../ui/Button/Button";

const MainLayout = () => {
  const { userData, signOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
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
              {userData && <p>Welcome, {userData.user.username}</p>}
              <Button
                variant="inverted"
                className={styles["log-btn"]}
                type="button"
                onClick={userData ? signOut : handleLogin}
              >
                {userData ? "Logout" : "Login"}
              </Button>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
