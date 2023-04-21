import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Alert, Paper, Box, Typography, Input } from "@mui/material";
import { useAuth } from "../../context/authContext";

function Register() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    nickName: "",
    adress: "",
    profile: "",

  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    nickName: "",
    adress: "",
    profile: "",
  });
  const navigate = useNavigate();

  const { signup, loginWithGoogle } = useAuth();

  function handleInputChange(e) {
    switch (e.target.name) {
      case "imageFile":
        setUserData({ ...userData, profile: e.target.files[0] })
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        // reader.onloadend = () => {
        //   setUserData({ ...userData, profilePicture: reader.result });
        // };
        break;

      default:
        setUserData({ ...userData, [e.target.name]: e.target.value });
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {

      await signup(userData.email, userData.password, userData.nickName, userData.adress, userData.profile);
      alert('You have register successfully!')

      navigate("/home");
    } catch (error) {
      if (error.code === "auth/weak-password")
        setErrors({
          ...errors,
          password: "Password too short, at least 6 characters",
        });
      if (error.code === "auth/invalid-email")
        setErrors({ ...errors, email: "You must introduce an email" });
      if (error.code === "auth/email-already-in-use")
        setErrors({ ...errors, email: "Email already in use" });
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      console.error(error)
    }
  };

  return (

    <Box sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
      <Paper elevation={10} style={{ borderRadius: '10px', padding: "1rem", maxWidth: "500px", backgroundColor: 'inherit' }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "2rem",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            type="text"
            label="Nombre de usuario"
            name="nickName"
            value={userData.nickName}
            onChange={handleInputChange}
            style={{ margin: "1rem" }}
          />
          {errors.nickName && (
            <Typography variant="caption" color="red">
              <p>{errors.nickName}</p>
            </Typography>
          )}

          <TextField
            type="email"
            label="Correo electrónico"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            style={{ margin: "0.5rem", width: '15rem' }}
          />
          {errors.email && <Typography variant="caption" color="red"><p>{errors.email}</p></Typography>}

          <TextField
            type="password"
            label="Contraseña"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            style={{ margin: "0.5rem", width: '15rem' }}
          />
          {errors.password && <Typography variant="caption" color="red"> <p>{errors.password}</p></Typography>}
          <TextField
            type="text"
            label="adress"
            name="adress"
            value={userData.adress}
            onChange={handleInputChange}
            style={{ margin: "1rem" }}
          />
          {errors.adress && <Typography variant="caption" color="red"><p>{errors.adress}</p></Typography>}
          <Input
            type="file"
            accept="image/*"
            name="imageFile"
            placeholder="Select an image for profile picture"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "1.5rem" }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGoogleSignIn}
            style={{ margin: "1rem" }}
          >
            Register with Google
          </Button>
          <Typography
            variant="body1"
            style={{ margin: "1rem", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Sign in
          </Typography>
        </form>
      </Paper>
    </Box>

  );
}

export default Register;
