import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import About from "../About";
import style from "./Landing.module.css";
import { Button, Container, Icon, IconButton } from "@material-ui/core";

const Landing = () => {
  function scrollToAbout() {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <Container>
      <section id="landing">
        <div className={style.container}>
          <Button
            size="medium"
            variant="contained"
            href="home"
            color="primary"
            endIcon={<Icon>library_books</Icon>}
          >
            Enter
          </Button>
          <FaChevronDown
            onClick={(e) => scrollToAbout()}
            className={style.flecha}
          />
        </div>
      </section>

      <About />
    </Container>
  );
};

export default Landing;
