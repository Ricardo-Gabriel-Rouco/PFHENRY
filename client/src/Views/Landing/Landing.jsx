import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import About from "../About";
import style from "./Landing.module.css";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { createUser, getUserById, logOut, sigInWithMail, verifyUserSesion } from "../../firebase/auth/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase-config";

const Landing = () => {
  function scrollToAbout() {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    // sigInWithMail("qwerty@gmail.com", "12345678")
    // verifyUserSesion()
    // setTimeout(()=>{
    //   logOut()
    // },5000)
    // verifyUserSesion()
    // getUserById("TqSDzvnHYJQi8T3hepXrVPD5XNQ2")
    signInWithPopup(auth, provider)
  }, [])
  
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
