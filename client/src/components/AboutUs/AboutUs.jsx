import imgJoaco from "../../Assets/joaco.jpeg";
import imgGabi from "../../Assets/gabrielRouco.jpg";
import imgJuli from "../../Assets/juli.jpeg";
import imgAlfredo from "../../Assets/alfre.jpeg";
import imgManu from "../../Assets/manu.jpeg";
import imgClau from "../../Assets/claudio.jpeg";
import imgMauri from "../../Assets/mauri.jpeg";
import s from "./AboutUs.module.css";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { FaChevronUp } from "react-icons/fa";
import {
  Box,
  Grid,
  CardMedia,
  Card,
  Typography,
} from "@mui/material";
import image from '../../Assets/imgLanding/image0.jpg'

function AboutUs() {
  function scrollToLanding() {
    const landing = document.getElementById("landing");
    if (landing) {
      landing.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <Box container sx={{
      backgroundImage: `url(${image})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      minWidth: 400,
      margin: "auto",
      overflowY: 'hidden'
    }}>
      <Box id='about'>
        <FaChevronUp onClick={(e) => scrollToLanding(e)} className={s.flecha} />
      </Box>
      <Box id='about'>
        <Typography variant="h1" fontSize={"fontSize.title"} color={'background.default'}>
          DREAM TEAM
        </Typography>
      </Box>
      <Box sx={{ marginLeft: '15rem', display: 'flex', flexWrap: 'nowrap', alignItems: "center", justifyContent: "center", maxHeight: "100%", maxWidth: "100%", overflowX: 'hidden', overflowY: 'hidden' }} >
        <Grid
          container
          sx={{
            padding: { xs: '1rem', md: '3rem' },
          }}
        >
          <Grid item xs={12} sm={8} md={5} lg={4}>
            {/* joaco */}

            <Card
              sx={{
                width: "300px",
                height: "400px",
                bgcolor: "background.default",
                marginRight: {xs:'30rem', sm:'15rem'}
              }}
            >
              <CardMedia
                component="img"
                image={imgJoaco}
                sx={{
                  borderRadius: "50%",
                  width: 249,
                  height: 260,
                  mx: "auto",
                  marginTop: "10px",
                }}
              />
              <Typography fontSize={"fontSize.thirdTitle"} marginTop={"15px"}>
                JOACO
              </Typography>
              <Typography fontSize={"fontSize.secondTitle"}>
                Joaquín Santiago Oliveira
              </Typography>

              <a href="https://github.com/fr0st1987">
                {" "}
                <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
              </a>

              <a href="https://www.linkedin.com/in/joaquin-santiago-oliveira">
                {" "}
                <AiFillLinkedin
                  className={s.linkedin}
                  icon={AiFillLinkedin}
                />{" "}
              </a>
            </Card>
          </Grid>

          {/* Gabi */}
          <Grid item xs={8} sm={6} md={4} lg={4} sx={{ marginBottom: '3rem' }}>
            <Card
              sx={{
                width: "300px",
                height: "400px",
                bgcolor: "background.default",
              }}
            >
              <CardMedia
                component="img"
                image={imgGabi}
                sx={{
                  borderRadius: "50%",
                  bgcolor: "lightgrey",
                  width: 249,
                  height: 260,
                  mx: "auto",
                  marginTop: "10px",
                  objectFit: "contain",
                  marginBottom: "10px"
                }}
              />
              <Typography fontSize={"fontSize.thirdTitle"} marginTop={"15px"}>
                GABI
              </Typography>
              <Typography fontSize={"fontSize.secondTitle"}>
                Gabriel Rouco
              </Typography>

              <a href="https://github.com/Ricardo-Gabriel-Rouco">
                {" "}
                <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
              </a>

              <a href="https://www.linkedin.com/in/ricardo-gabriel-rouco">
                {" "}
                <AiFillLinkedin
                  className={s.linkedin}
                  icon={AiFillLinkedin}
                />{" "}
              </a>
            </Card>
          </Grid>


          {/* Juli */}
          <Grid item xs={8} sm={6} md={4} lg={4}>
            <Card
              sx={{
                width: "300px",
                height: "400px",
                bgcolor: "background.default",
              }}
            >
              <CardMedia
                component="img"
                image={imgJuli}
                sx={{
                  borderRadius: "50%",
                  width: 249,
                  height: 260,
                  mx: "auto",
                  marginTop: "10px",
                }}
              />
              <Typography fontSize={"fontSize.thirdTitle"} marginTop={"15px"}>
                JULI
              </Typography>
              <Typography fontSize={"fontSize.secondTitle"}>
                Julian Giampetruzi
              </Typography>

              <a href="https://github.com/jgiampe">
                {" "}
                <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
              </a>

              <a href="https://www.linkedin.com/in/julian-giampetruzzi">
                {" "}
                <AiFillLinkedin
                  className={s.linkedin}
                  icon={AiFillLinkedin}
                />{" "}
              </a>
            </Card>
          </Grid>

          {/* Manu */}
          <Grid item xs={8} sm={6} md={4} lg={4}>
            <Card
              sx={{
                width: "300px",
                height: "400px",
                bgcolor: "background.default",
              }}
            >
              <CardMedia
                component="img"
                image={imgManu}
                sx={{
                  borderRadius: "50%",
                  width: 249,
                  height: 260,
                  mx: "auto",
                  marginTop: "10px",
                  objectFit: "contain",
                  bgcolor: "lightgrey"
                }}
              />
              <Typography fontSize={"fontSize.thirdTitle"} marginTop={"15px"}>
                MANU
              </Typography>
              <Typography fontSize={"fontSize.secondTitle"}>
                Manuel Mittac
              </Typography>

              <a href="https://github.com/mmitacc">
                {" "}
                <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
              </a>

              <a href="https://www.linkedin.com/in/mmitacc/">
                {" "}
                <AiFillLinkedin
                  className={s.linkedin}
                  icon={AiFillLinkedin}
                />{" "}
              </a>
            </Card>
          </Grid>

          {/* Alfre */}
          <Grid item xs={8} sm={6} md={4} lg={4}>
            <Card
              sx={{
                width: "300px",
                height: "400px",
                bgcolor: "background.default",
              }}
            >
              <CardMedia
                component="img"
                image={imgAlfredo}
                sx={{
                  borderRadius: "50%",
                  width: 249,
                  height: 260,
                  mx: "auto",
                  marginTop: "10px",
                }}
              />
              <Typography fontSize={"fontSize.thirdTitle"} marginTop={"15px"}>
                ALFRE
              </Typography>
              <Typography fontSize={"fontSize.secondTitle"}>
                Alfredo Gonzalez
              </Typography>

              <a href="https://github.com/Alfredocgn">
                {" "}
                <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
              </a>

              <a href="https://www.linkedin.com/in/alfredo-c-gonzalez-noriega-095b40119/">
                {" "}
                <AiFillLinkedin
                  className={s.linkedin}
                  icon={AiFillLinkedin}
                />{" "}
              </a>
            </Card>
          </Grid>

          {/* Mauri */}
          <Grid item xs={8} sm={6} md={4} lg={4} sx={{ marginBottom: '3rem' }}>
            <Card
              sx={{
                width: "300px",
                height: "400px",
                bgcolor: "background.default",
              }}
            >
              <CardMedia
                component="img"
                image={imgMauri}
                sx={{
                  borderRadius: "50%",
                  width: 249,
                  height: 260,
                  mx: "auto",
                  marginTop: "10px",
                }}
              />

              <Typography fontSize={"fontSize.thirdTitle"} marginTop={"15px"}>
                MAURI
              </Typography>
              <Typography fontSize={"fontSize.secondTitle"}>
                Mauricio Salerno
              </Typography>

              <a href="https://github.com/MLSalerno">
                {" "}
                <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
              </a>

              <a href="https://www.linkedin.com/in/mauricio-salerno">
                {" "}
                <AiFillLinkedin
                  className={s.linkedin}
                  icon={AiFillLinkedin}
                />{" "}
              </a>
            </Card>
          </Grid>

          {/* Clau */}
          <Grid item xs={8} sm={6} md={4} lg={4} sx={{ display: 'flex', justifyContent: 'center', marginLeft: '25.7rem' }}>
            <Card
              sx={{
                width: "300px",
                height: "400px",
                bgcolor: "background.default",
              }}
            >
              <CardMedia
                component="img"
                image={imgClau}
                sx={{
                  borderRadius: "50%",
                  width: 249,
                  height: 260,
                  mx: "auto",
                  marginTop: "10px",
                }}
              />

              <Typography fontSize={"fontSize.thirdTitle"} marginTop={"15px"}>
                CLA
              </Typography>
              <Typography fontSize={"fontSize.secondTitle"}>
                Claudio Peralta
              </Typography>

              <a href="https://github.com/ClaPeralta">
                {" "}
                <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
              </a>

              <a href="https://www.linkedin.com/in/claudio-peralta-2a6777253/">
                {" "}
                <AiFillLinkedin
                  className={s.linkedin}
                  icon={AiFillLinkedin}
                />{" "}
              </a>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AboutUs;
