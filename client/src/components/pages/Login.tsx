import { useContext, useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import LabelInput from "../ui/LabelInput/LabelInput";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { AxiosError } from "axios";
import BackendError from "../../types/error";
import ResendVerificationButton from "../ResendVerificationButton/ResendVerificationButton";
import styles from "./Login.module.css";

const Login = () => {
  const { userData, signIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState<AxiosError<BackendError>>();

  const [lastUsername, setLastUsername] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLastUsername(username);

      const userData = await AuthService.login(username, password);
      signIn(userData);
    } catch (err) {
      if (err instanceof AxiosError) {
        return setApiError(err);
      }
      throw err;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      {apiError && (
        <div className={styles["error-message"]}>
          {apiError.status === 401 &&
            (apiError.response?.data.code === "NOT_VERIFIED" ? (
              <>
                <span>You haven't verified your email yet. </span>
                {lastUsername && (
                  <ResendVerificationButton username={lastUsername} />
                )}
              </>
            ) : (
              <span>Wrong username or password.</span>
            ))}
          {apiError.status !== 401 && <span>Error trying to login.</span>}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <LabelInput
            label="Username"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
        </div>
        <div className={styles["form-group"]}>
          <LabelInput
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <button
          className={styles["submit-btn"]}
          type="submit"
          disabled={!username || !password}
        >
          Login
        </button>
      </form>
      <div className={styles.register}>
        <p>Don't have an account yet?</p>
        <Link className="link" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
