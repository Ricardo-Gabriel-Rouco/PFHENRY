import { useEffect, useState } from "react";
import { Button, Grid, Typography, CardMedia } from "@mui/material";
import { keyframes } from "@emotion/react";

const opacities = keyframes`
  0% {
    opacity: 1,
    transform: "scale(1)",
  },
  100% {
    opacity: 0,
    transform: "scale(2)",
  },
`;
const Landing = () => {
  const allImage = 5; //define el numero de "image" a renderizar
  const [selectImage, SetSelectImage] = useState(0);
  const [loading, SetLoading] = useState(false); //controlando el "loading" de carga de image
  useEffect(() => {
    const interval = setInterval(() => {
      selectImage < allImage - 1
        ? SetSelectImage(selectImage + 1)
        : SetSelectImage(0);
    }, 2000);
    SetLoading(false);
    return () => clearInterval(interval);
  });

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        minWidth: 300,
        width: "100%",
        height: "100vh",
      }}
    >
      <Grid item xs="12" position="absolute">
        <Typography
          sx={{
            fontSize: "3vw",
            color: "primary.main",
            textShadow:
              "2px 2px 4px rgb(0, 0, 0), 0 0 30px rgb(255, 255, 255), 0 0 30px rgb(255, 255, 255), 0 0 30px rgb(255, 255, 255)",
            fontFamily: "Celtic MD",
            backdropFilter: "blur(1.5px)",
            bgcolor: "rgba(200, 200, 200, 0.4)",
            padding: "1rem",
            borderRadius: "1rem",
            marginTop: "1rem",
          }}
        >
          Book's Kingdom
        </Typography>
      </Grid>
      <Grid item xs="12" sx={{ margin: "auto" }}>
        <CardMedia
          component="img"
          onLoad={() => SetLoading(true)}
          image={require(`../../Assets/imgLanding/image${selectImage}.jpg`)}
          alt="The way to Book's Kingdom"
          style={{
            animation: `${opacities} 2s infinite ease`,
            borderRadius: "30px",
            border: "solid black 0.1rem",
            width: "60%",
            margin: "auto",
          }}
        />
      </Grid>

      <Grid item xs="12">
        <Button
          variant="contained"
          href="home"
          sx={{
            bgcolor: "#DE8319",
            color: "#ffffff",
            ":hover": {
              color: "#DE8319",
              bgcolor: "#ffffff",
            },
          }}
        >
          Enter to Kingdom
        </Button>
      </Grid>
    </Grid>
  );
};

export default Landing;
