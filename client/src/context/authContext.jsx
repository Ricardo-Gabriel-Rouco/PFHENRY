import { createContext, useContext } from "react";
import { createUser, sigInWithMail } from "../firebase/auth/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext)
  return context
}


export function AuthProvider({ children }) {
  const signup = async (email, password) => {
    await createUser(email,  password)
  }

  const login = async(email, password) => {
    await sigInWithMail(email, password)
  }
  return <authContext.Provider value={{ signup, login }}>{children}</authContext.Provider>;
}
