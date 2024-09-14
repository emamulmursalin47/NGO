import { Navigate } from "react-router-dom";
import { useUserType } from "../../hooks/userContext";

const AdminRoute = ({ children, roles }) => {
  const { getUser, isLoading } = useUserType();
  if (isLoading || !roles) {
    return;
  }
  const role = getUser();
  const allowedRoles = Array.isArray(roles) ? roles : [];

  const check = allowedRoles.includes(role);

  return check ? children : <Navigate to="/auth/login" />;
};

export default AdminRoute;
