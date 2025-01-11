import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import { Link, useNavigate, useSearchParams } from "react-router";
import { AxiosError } from "axios";

type Props = {
  action: "verify" | "cancel";
};

const VerificationAction = ({ action }: Props) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }

    const performAction = async () => {
      try {
        if (action === "verify") {
          await AuthService.verifyEmail(token);
        } else if (action === "cancel") {
          await AuthService.cancelVerification(token);
        }
        setLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err);
          setLoading(false);
        }
        throw err;
      }
    };

    performAction();
  }, [action, navigate, token]);

  return (
    <div className="page-message">
      {loading && <p>Loading...</p>}
      {error && (
        <p>Error trying to perform this action. Maybe the token expired.</p>
      )}
      {!error && !loading && (
        <>
          <p>Success!</p>
          <Link className="link" to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default VerificationAction;
