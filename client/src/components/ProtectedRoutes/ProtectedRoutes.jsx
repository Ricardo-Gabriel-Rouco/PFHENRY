import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
// esto va para el equipo del futuro (mañana), sirve para proteger las rutas (lease dashboard y demas)

export default function ProtectedRoutes({ children }) {
  const { userStatus } = useAuth();

  if (!userStatus.logged) return <Navigate to="/login" />;
  else return <>{children}</>;
}