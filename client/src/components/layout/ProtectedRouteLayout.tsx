import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRouteLayout = () => {
  const { ready, userData } = useContext(AuthContext);

  return !ready || userData ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouteLayout;
