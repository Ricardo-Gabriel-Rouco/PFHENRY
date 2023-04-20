import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import YouShallNotPass from "../YouShalNotPass/YouShallNotPass";


function AdminRoutes({ children }) {
  const {userStatus} = useAuth()
  const navigate = useNavigate()

  if(!userStatus.logged) navigate('/login')
  else if(!userStatus.role.includes('ADMIN')) return <YouShallNotPass/>


  else return <>{children}</>;
}

export default AdminRoutes;
