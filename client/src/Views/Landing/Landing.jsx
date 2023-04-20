import { useEffect, useState } from "react";
import { Button, Grid, Typography, CardMedia } from "@mui/material";
import background from "../../Assets/fondoTenue.jpg";
import { FaChevronDown } from "react-icons/fa";
import About from "../About";
import style from "./Landing.module.css";

const Landing = () => {
  function scrollToAbout() {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  }

  const allImage = 5; //define el numero de "image" a renderizar
  const [selectImage, SetSelectImage] = useState(0);
  const [loaded, SetLoaded] = useState(false); //controlando el "loaded" de carga de imagen
  useEffect(() => {
    const interval = setInterval(() => {
      SetLoaded(false);
      selectImage < allImage - 1
        ? SetSelectImage(selectImage + 1)
        : SetSelectImage(0);
    }, 2500);
    return () => clearInterval(interval);
  });

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        minWidth: 400,
        width: "100%",
        height: "100vh",
        margin: "auto",
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
      <Grid item xs="12" sx={{ margin: "2rem auto" }}>
        <CardMedia
          component="img"
          src={require(`../../Assets/imgLanding/image${selectImage}.jpg`)}
          onLoad={() => SetLoaded(true)}
          alt="The way to Book's Kingdom"
          {...(loaded ? { timeout: 2000 } : {})}
          style={{
            transition: loaded ? "1000ms" : undefined,
            opacity: loaded ? 1 : 0,
            borderRadius: "30px",
            border: "solid black 0.1rem",
            minWidth: 400,
            width: "50%",
            margin: "auto",
          }}
        />
      </Grid>
      <Grid
        container
        gridTemplateColumns="repeat(5, 1fr)"
        margin={0}
        height="fit-content"
        alignItems="flex.start"
        justifyContent="center"
        xs="12"
      >
        <Grid
          item
          bgcolor="#663B2A"
          style={{ maxWidth: "min-content", height: "auto" }}
        >
          <CardMedia
            component="img"
            src={require(`../../Assets/imgLanding/image0.jpg`)}
            alt="The way to Book's Kingdom"
            {...(loaded && selectImage === 0 ? { timeout: 2000 } : {})}
            style={{
              transition: loaded && selectImage === 0 ? "1000ms" : undefined,
              opacity: loaded && selectImage === 0 ? 1 : 0.2,
              border: "solid black 0.1rem",
              minWidth: 80,
              width: "20%",
            }}
          />
        </Grid>
        <Grid
          item
          bgcolor="#663B2A"
          style={{ maxWidth: "min-content", height: "auto" }}
        >
          <CardMedia
            component="img"
            src={require(`../../Assets/imgLanding/image1.jpg`)}
            alt="The way to Book's Kingdom"
            {...(loaded && selectImage === 1 ? { timeout: 2000 } : {})}
            style={{
              transition: loaded && selectImage === 1 ? "1000ms" : undefined,
              opacity: loaded && selectImage === 1 ? 1 : 0.2,
              border: "solid black 0.1rem",
              minWidth: 80,
              width: "20%",
            }}
          />
        </Grid>
        <Grid
          item
          bgcolor="#663B2A"
          style={{ maxWidth: "min-content", height: "auto" }}
        >
          <CardMedia
            component="img"
            src={require(`../../Assets/imgLanding/image2.jpg`)}
            alt="The way to Book's Kingdom"
            {...(loaded && selectImage === 2 ? { timeout: 2000 } : {})}
            style={{
              transition: loaded && selectImage === 2 ? "1000ms" : undefined,
              opacity: loaded && selectImage === 2 ? 1 : 0.2,
              border: "solid black 0.1rem",
              minWidth: 80,
              width: "20%",
            }}
          />
        </Grid>
        <Grid
          item
          bgcolor="#663B2A"
          style={{ maxWidth: "min-content", height: "auto" }}
        >
          <CardMedia
            component="img"
            src={require(`../../Assets/imgLanding/image3.jpg`)}
            alt="The way to Book's Kingdom"
            {...(loaded && selectImage === 3 ? { timeout: 2000 } : {})}
            style={{
              transition: loaded && selectImage === 3 ? "1000ms" : undefined,
              opacity: loaded && selectImage === 3 ? 1 : 0.2,
              border: "solid black 0.1rem",
              minWidth: 80,
              width: "20%",
            }}
          />
        </Grid>
        <Grid
          item
          bgcolor="#663B2A"
          style={{ maxWidth: "min-content", height: "auto" }}
        >
          <CardMedia
            component="img"
            src={require(`../../Assets/imgLanding/image4.jpg`)}
            alt="The way to Book's Kingdom"
            {...(loaded && selectImage === 4 ? { timeout: 2000 } : {})}
            style={{
              transition: loaded && selectImage === 4 ? "1000ms" : undefined,
              opacity: loaded && selectImage === 4 ? 1 : 0.2,
              border: "solid black 0.1rem",
              minWidth: 80,
              width: "20%",
            }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs="12"
        justifyContent="center"
        sx={{ display: "grid", alignItems: "stretch", alignContent: "center" }}
      >
        <Button
          variant="contained"
          href="home"
          sx={{
            marginX: "auto",
            marginY: "0",
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
        <FaChevronDown
          onClick={(e) => scrollToAbout()}
          className={style.flecha}
        />
      </Grid>
      <About />
    </Grid>
  );
};

export default Landing;
