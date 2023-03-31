import { createContext, useContext, useEffect, useState } from "react";
import {
  createUser,
  sigInWithMail,
  logOut
} from "../firebase/auth/auth";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  const [userStatus, setUserStatus] = useState(null);

  const signup = async (email, password) => {
    await createUser(email, password);
  };

  const login = async (email, password) => {
    await sigInWithMail(email, password);
  };

  useEffect(() => {
    onAuthStateChanged(auth, currentUser =>{
      setUserStatus(currentUser)
    })
  }, []);

  const logout = async ()=>{
    await logOut()
  }

  return (
    <authContext.Provider value={{ signup, login, userStatus, logout }}>
      {children}
    </authContext.Provider>
  );
}
