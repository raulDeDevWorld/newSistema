import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({
  isAllowed,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={"/Login"} />;
  }
  return children
};