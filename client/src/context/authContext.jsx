import { createContext, useContext } from "react";
import { createUser } from "../firebase/auth/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext)
  return context
}


export function AuthProvider({ children }) {
  const signup = async (email, password) => {
    await createUser(email,  password)

  }
  return <authContext.Provider value={{ signup }}>{children}</authContext.Provider>;
}
