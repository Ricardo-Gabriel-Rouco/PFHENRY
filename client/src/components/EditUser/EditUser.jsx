import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../context/authContext";
import { validate } from './validation'

function EditUser() {
  const {customize, userStatus} = useAuth()
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({
    nickName: "",
    userId: userStatus.userId
  });
  const [errors, setErrors] = useState({
    nickName: "",
  });
  // const navigate = useNavigate();


  function handleInputChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors(validate(userData.nickName))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(errors) throw new Error('No se puede cambiar el nombre de usuario')
    try {
      await customize(userStatus.userId,userData.nickName || userStatus.nickName);
      setOpen(true)
      // navigate("/home");
    } catch (error) {
      console.log(error)
  }
}

const action = (
  <>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </>
);

  return (
    <>
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "2rem",
      }}
      onSubmit={handleSubmit}
      >
      <Typography>Email de usuario {userStatus.email}</Typography>
      <br />
      <Typography>Nombre de ususario actual: {userStatus.nickName}</Typography>
      <TextField
        type="text"
        label="Nombre de usuario"
        name="nickName"
        value={userData.nickName}
        onChange={handleInputChange}
        style={{ margin: "1rem" }}
      />
      {/* {errors.nickName && <p>{errors.nickName}</p>} */}
      <Typography>Nombre Completo actual: {userStatus.fullName}</Typography>
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
        Modificar
      </Button>
    </form>
    <Snackbar
        open={open}
        autoHideDuration={5000}
        message="Se cambiaron los datos con exito"
        action={action}
      />
    </>
  );
}


export default EditUser;
