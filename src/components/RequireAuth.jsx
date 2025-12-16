import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet /> // If logged in, show the page
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  // If not, send to login with the current location attached
};

export default RequireAuth;
