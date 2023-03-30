import React, { useState } from "react";
import { registerWithGoogle } from "../../firebase/auth/googleLogIn";
import { sigInWithMail } from "../../firebase/auth/auth";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logUserIn } from "../../redux/rootReducer/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  async function registerMail() {
    try {
      await sigInWithMail(userData.email, userData.password);
      dispatch(logUserIn(true))
      navigate('/home')
    } catch (error) {
      alert('Error al iniciar sesion: ', error)
    }
  }

  async function registerGoogle() {
    try {
      await registerWithGoogle();
      dispatch(logUserIn(true))     
      navigate('/home')
    } catch (error) {
      alert('Error al iniciar sesion: ', error)
    }
  }

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={registerMail} style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2rem" }}>
      <TextField type="text" name="email" value={userData.email} label="Correo electrónico" onChange={handleInputChange} style={{ margin: "1rem" }}/>
      <TextField type="password" name="password" value={userData.password} label="Contraseña" onChange={handleInputChange} style={{ margin: "1rem" }}/>
      <Button type="submit" variant="contained" color="primary" style={{ margin: "2rem" }}>Iniciar Sesion</Button>
        <Button variant="contained" color="secondary" onClick={() => {registerGoogle();}} style={{ margin: "2rem" }}>
          Inicia sesion con Google
        </Button>
      <Link to={"/register"}>No tienes Cuenta? crea una</Link>
    </form>
  );
};

export default Login;
