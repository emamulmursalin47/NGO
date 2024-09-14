import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useUserType } from "../hooks/userContext";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { getUser } = useUserType();

  const role = getUser();

  const content = allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
