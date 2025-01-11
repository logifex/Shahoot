import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import LabelInput from "../ui/LabelInput/LabelInput";
import AuthService from "../../services/AuthService";
import { AxiosError } from "axios";
import BackendError from "../../types/error";
import styles from "./Login.module.css";

const Register = () => {
  const { userData } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: false,
  });
  const [apiError, setApiError] = useState<AxiosError<BackendError>>();

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !username || !password) {
      return;
    }

    if (password !== confirmPassword.value) {
      setConfirmPassword((prevValue) => ({ ...prevValue, error: true }));
      return;
    }

    try {
      await AuthService.register(email, username, password);

      navigate("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        setApiError(err);
        return;
      }
      throw err;
    }
  };

  const hasError = (field: string): boolean => {
    if (!apiError?.response?.data.errors) {
      return false;
    }

    return apiError.response.data.errors.some((err) => err.path === field);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {apiError && (
        <div className={styles["error-message"]}>
          {apiError.response?.data.code !== "VALIDATION_ERROR" &&
            (apiError.response?.data.code === "USER_EXISTS" ? (
              <span>User with that email or username already exists.</span>
            ) : (
              <span>"Error trying to register."</span>
            ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <LabelInput
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={hasError("email")}
          />
        </div>
        <div className={styles["form-group"]}>
          <LabelInput
            label="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            error={hasError("username")}
          />
          {hasError("username") && (
            <small className={styles["error-field"]}>
              Username should contain 4-30 characters and no special characters
            </small>
          )}
        </div>
        <div className={styles["form-group"]}>
          <LabelInput
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={hasError("password")}
          />
          {hasError("password") && (
            <small className={styles["error-field"]}>
              Password should contain at least 8 characters and no spaces
            </small>
          )}
        </div>
        <div className={styles["form-group"]}>
          <LabelInput
            label="Confirm Password"
            type="password"
            onChange={(e) =>
              setConfirmPassword({ value: e.target.value, error: false })
            }
            value={confirmPassword.value}
            error={confirmPassword.error}
          />
          {confirmPassword.error && (
            <small className={styles["error-field"]}>
              Passwords aren't identical
            </small>
          )}
        </div>
        <button className={styles["submit-btn"]} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;