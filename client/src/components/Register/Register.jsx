import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { createUser } from "../../firebase/auth/auth";
import { registerWithGoogle } from "../../firebase/auth/googleLogIn";
import { useDispatch } from "react-redux";
import { logUserIn } from "../../redux/rootReducer/userSlice";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password)
      dispatch(logUserIn(true))
      navigate('/home')
    } catch (error) {
      alert('Error al iniciar sesion: ', error)
    }
  };

  const handleGoogleSignIn = async() => {
    try {
      await registerWithGoogle()
      dispatch(logUserIn(true))
      navigate('/home')
    } catch (error) {
      alert('Error al iniciar sesion: ', error)
    }
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2rem" }}>
      <TextField type="email" label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={{ margin: "1rem" }} />
      <TextField type="password" label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={{ margin: "1rem" }} />
      <Button variant="contained" color="primary" onClick={handleRegister} style={{ margin: "2rem" }}>
        Registrarse
      </Button>
      <Button variant="contained" color="secondary" onClick={handleGoogleSignIn} style={{ margin: "2rem" }}>
        Registrarse con Google
      </Button>
      <Link to="/login">¿Ya tienes una cuenta? Inicia sesión aquí.</Link>
    </form>
  );
}

export default Register;