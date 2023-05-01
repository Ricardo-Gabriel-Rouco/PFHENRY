import { useEffect, useState } from "react";
import AboutUs from "../../components/AboutUs/AboutUs";
import { Button, Grid, Typography, CardMedia, Box } from "@mui/material";
import background from "../../Assets/fondoTenue.jpg";
import { FaChevronDown } from "react-icons/fa";
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
    <>
      <Box id="landing" sx={{overflowY: 'hidden'}}> 
    <Grid
      container
      justifyContent="center"
      sx={{
        bgcolor :'white',
      }}
      >
      <Grid item xs="12" position="absolute">
        <Typography
          sx={{
            fontSize: "3vw",
            // color: "primary.main",
            textShadow:
            "2px 2px 4px rgb(0, 0, 0), 0 0 30px rgb(255, 255, 255), 0 0 30px rgb(255, 255, 255), 0 0 30px rgb(255, 255, 255)",
            fontFamily: "Celtic MD",
            // backdropFilter: "blur(1.5px)",
            bgcolor: "white",
            padding: "1rem",
            borderRadius: "1rem",
            marginTop:'1rem'
          }}
          >
          Book's Kingdom
        </Typography>
      </Grid>
      <Grid item xs="12" sx={{ marginTop: "8rem" }}>
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
            zIndex: 0
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
        marginTop='1rem'
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
        sx={{ display: "grid", alignItems: "stretch", alignContent: "center",marginTop:'1rem' }}
        >
        <Button
          variant="contained"
          href="home"
          sx={{
            marginX: "auto",
            marginY: "0",
            bgcolor:  "#a74949",
            color: "#ffffff",
            ":hover": {
              color: "#ffffff",
              bgcolor: "#e4704c"
            },
          }}
          >
          Enter to the Kingdom
        </Button>
        <FaChevronDown
          onClick={(e) => scrollToAbout()}
          className={style.flecha}
          />
      </Grid>
    </Grid>
          </Box>
    
    <AboutUs />
    </>
  );
};

export default Landing;
