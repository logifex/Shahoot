import { Link, Outlet } from "react-router";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <Link to="/">
            <div className={styles.title}>
              <p>Shahoot!</p>
            </div>
          </Link>
          <div className={styles["user-info"]}>
            <p>Welcome, User</p>
            <button className={styles["log-btn"]} type="button">
              Logout
            </button>
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
