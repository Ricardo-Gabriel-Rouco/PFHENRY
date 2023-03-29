import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import About from "../About";
import style from "./Landing.module.css";
import { Button } from "@mui/material";
// import { useEffect } from "react";
// import { createUser, logOut, sigInWithMail, verifyUserSesion } from "../../firebase/auth/auth";

const Landing = () => {
  function scrollToAbout() {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  }

  // useEffect(() => {
  //   sigInWithMail("qwerty@gmail.com", "12345678")
  //   verifyUserSesion()
  //   setTimeout(()=>{
  //     logOut()
  //   },5000)
  //   verifyUserSesion()
  // }, [])
  
  return (
    <>
      <section id="landing">
        <div className={style.container}>
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
      </section>

      <About />
    </>
  );
};

export default Landing;
