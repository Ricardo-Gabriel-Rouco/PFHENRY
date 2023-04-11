import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../../context/authContext";

function Register() {
  const {customize} = useAuth()
  const [userData, setUserData] = useState({
    nickName: "",
    fullName: ""
  });
  // const [errors, setErrors] = useState({
  //   nickName: "",
  //   fullName: ""
  // });
  const navigate = useNavigate();


  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await customize(userData.nickName, userData.fullName);
      navigate("/home");
    } catch (error) {
      console.log(error)
  }
}

  return (
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
      {/* {errors.nickName && <p>{errors.nickName}</p>} */}

      <TextField
        type="text"
        label="Nombre completo"
        name="fullName"
        value={userData.fullName}
        onChange={handleInputChange}
        style={{ margin: "1rem" }}
      />
      {/* {errors.fullName && <p>{errors.fullName}</p>} */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "2rem" }}
      >
        Registrarse
      </Button>
    </form>
  );
}


export default Register;
