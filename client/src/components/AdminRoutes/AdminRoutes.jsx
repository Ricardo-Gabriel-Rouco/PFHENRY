// import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import YouShallNotPass from "../YouShalNotPass/YouShallNotPass";

function AdminRoutes({ children }) {
  const {userStatus} = useAuth()

  if(userStatus.role !== 'ADMIN')return <YouShallNotPass/>

  return <>{children}</>;
}

export default AdminRoutes;
