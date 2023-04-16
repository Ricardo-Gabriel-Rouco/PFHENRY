import { createContext, useContext, useEffect, useState } from "react";
import {
  createUser,
  sigInWithMail,
  logOut,
  getUserById,
} from "../firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import { registerWithGoogle } from "../firebase/auth/googleLogIn";
import {updateUser} from '../firebase/auth/customizeUser'
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState({
    logged: null,
    userId: "",
    email: "",
    role: "",
    nickName: "",
  });
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, nickName) => {
    await createUser(email, password, nickName);
  };

  const login = async (email, password) => {
    await sigInWithMail(email, password);
  };

  const customize = async (userId, nickname) => {
    await updateUser(userId, nickname)
    setUserStatus({
      ...userStatus,
      nickName: nickname,
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRole = await getUserById(currentUser.uid);
        setUserStatus({
          ...userStatus,
          logged: true,
          userId: currentUser.uid,
          email: currentUser.email,
          role: userRole.rol,
          nickName: userRole.nickname,
        });
      }
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userStatus.logged) {
      navigate("/home");
    }
     // eslint-disable-next-line
  }, []);


  const logout = async () => {
    await logOut();
    setUserStatus({ ...userStatus, logged: false, role: "" });
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
        customize
      }}
    >
      {children}
    </authContext.Provider>
  );
}
