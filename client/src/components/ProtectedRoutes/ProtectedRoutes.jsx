import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// esto va para el equipo del futuro (mañana), sirve para proteger las rutas (lease dashboard y demas)

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}