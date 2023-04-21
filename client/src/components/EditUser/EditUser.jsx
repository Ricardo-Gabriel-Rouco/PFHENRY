import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Snackbar, IconButton, CardMedia, Input, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../context/authContext";
import { validate } from './validation'

function EditUser() {
  const {customize, userStatus} = useAuth()
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({
    nickName: "",
    userId: userStatus.userId,
    profile: userStatus.profilePicture,
    adress: userStatus.adress
  });
  const [errors, setErrors] = useState({
    nickName: "",
  });
  // const navigate = useNavigate();

  function handleInputChange(e) {
    switch (e.target.name) {
      case "imageFile":
        setUserData({...userData, profile: e.target.files[0]})
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        // reader.onloadend = () => {
        //   setUserData({ ...userData, profile: reader.result });
        // };
        break;

      default:
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setErrors(validate(userData.nickName))
        break;
    }
  }

  async function handleSubmit(e) {
    // console.log(userData.profile)
    e.preventDefault();
    if(errors.length) throw new Error('No se puede cambiar el nombre de usuario')
    try {
      await customize(userStatus.userId,userData.nickName , userData.profile , userData.adress );
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
    <Box sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
    <Paper elevation={10} style={{ borderRadius: '10px', padding: "1rem", maxWidth: "500px", backgroundColor: 'inherit' }}>
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
        margin: "2rem",
      }}
      onSubmit={handleSubmit}
      >
      <Typography fontWeight={'bold'}> {userStatus.email}</Typography>  
      <Typography fontWeight={'bold'}> {userStatus.nickName}</Typography>
      <TextField
        type="text"
        label="Username"
        name="nickName"
        value={userData.nickName}
        onChange={handleInputChange}
        style={{ margin: "1rem" }}
        />
      {/* {errors.nickName && <p>{errors.nickName}</p>} */}

      <TextField
        type="text"
        label="Address"
        name="adress"
        value={userData.adress}
        onChange={handleInputChange}
        style={{ margin: "1rem" }}
        />

      {userStatus.profilePicture? <CardMedia
      component="img"
      height="300"
      sx={{
        width: "10rem",
        height: "14rem",
        objectFit: "cover",
        marginTop: "0px",
      }}
      image={userStatus.profilePicture}/> : null}
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
        style={{ margin: "2rem" }}
        >
        MODIFY
      </Button>
    </form>
    <Snackbar
        open={open}
        autoHideDuration={5000}
        message="Se cambiaron los datos con exito"
        action={action}
        />
  </Paper>
  </Box>

  );
}


export default EditUser;
