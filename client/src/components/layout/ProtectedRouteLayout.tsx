import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRouteLayout = () => {
  const { userData } = useContext(AuthContext);

  return userData ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouteLayout;
