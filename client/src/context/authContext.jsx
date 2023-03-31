import { createContext, useContext, useEffect, useState } from "react";
import { createUser, sigInWithMail, logOut } from "../firebase/auth/auth";
import { registerWithGoogle } from "../firebase/auth/googleLogIn";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    await createUser(email, password);
  };

  const login = async (email, password) => {
    await sigInWithMail(email, password);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserStatus(currentUser);
      setLoading(false);
    });
  }, []);

  const logout = async () => {
    await logOut();
  };

  const loginWithGoogle = async () => {
    await registerWithGoogle();
  };

  const resetPassword = async (email) => {
    sendPasswordResetEmail(auth, email);
  };
  return (
    <authContext.Provider
      value={{
        signup,
        login,
        userStatus,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
