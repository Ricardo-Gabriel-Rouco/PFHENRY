import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      await login(userData.email, userData.password)
      navigate('/home')
    } catch (error) {
      console.log(error.code)
    }
  }

  async function registerGoogle() {
    try {
    
      navigate('/home')
    } catch (error) {
      alert('Error al iniciar sesion: ', error)
    }
  }

  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2rem" }}>
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
