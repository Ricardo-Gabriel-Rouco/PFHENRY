import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
// import About from "../About";
import style from "./Landing.module.css";
import { Button, Box, Grid, Typography } from "@mui/material";
import background from "../../Assets/fondoResponsive.jpg";

const Landing = () => {
  function scrollToAbout() {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <Box
        id="landing"
        sx={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          // zIndex: 0,
        }}
      >
        <Grid
          container
          justifyContent="center"
          // alignItems={'center'}
          sx={{ width: "100%", height: "100vh" }}
        >
          <Grid item marginTop={"5rem"}>
            <Typography
              sx={{
                fontSize: "7vw",
                color: "primary.main",
                fontFamily: "Celtic MD",
                backdropFilter: "blur(1.5px)",
                backgroundColor: "rgba(220, 220, 220, 0.4)",
                padding: "1rem",
                borderRadius: "1rem",
              }}
            >
              Book's <br /> Kingdom
            </Typography>

            <div>
              <FaChevronDown
                onClick={(e) => scrollToAbout()}
                className={style.flecha}
              />
              <div>
                <Link to="home">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#DE8319",
                      color: "HighlightText",
                      mb: 10,
                    }}
                  >
                    Enter the Kingdom
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/* <About /> */}
    </>
  );
};

export default Landing;
