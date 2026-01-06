import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authguard";

export function ProtectedRoute() {
  const { token, loading } = useAuth();

  if (loading) return null;

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
