import imgJoaco from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import imgGabi from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import imgJuli from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import imgAlfredo from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import imgDiego from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import imgManu from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import imgClau from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import imgMauri from "../../Assets/WhatsApp Image 2023-02-23 at 11.58.54.jpeg";
import s from "./AboutUs.module.css";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { FaChevronUp } from "react-icons/fa";
import {Grid, CardMedia, Card} from '@mui/material'

function AboutUs() {
  function scrollToLanding() {
    const landing = document.getElementById("landing");
    if (landing) {
      landing.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <>
      <section id="about" className={s.container}>
        <div className={s.titulo}>
          <FaChevronUp onClick={(e) => scrollToLanding(e)} className={s.flecha} />
          KB TEAM - EL ORDEN DPS LO CAMBIAMOS, FUI AGREGANDO! -joaco-
        </div>
        <div className={s.cardsContainer}>
          {/* joaco */}

          <div className={s.card}>
            <div className={s.divImg}>
              <img className={s.img} src={imgJoaco} alt="img" />
            </div>
            <h3 className={s.apodo}>JOACO</h3>
            <h2 className={s.nombreCompleto}>Joaquín Santiago Oliveira</h2>

            <a href="https://github.com/fr0st1987">
              {" "}
              <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/joaquin-santiago-oliveira">
              {" "}
              <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} />{" "}
            </a>
          </div>
          {/* Gabi */}
          <div className={s.card}>
            <div className={s.divImg}>
              <img className={s.img} src={imgGabi} alt="img" />
            </div>
            <h3 className={s.apodo}>GABI</h3>
            <h2 className={s.nombreCompleto}>Gabriel Rouco</h2>

            <a href="https://github.com/Ricardo-Gabriel-Rouco">
              {" "}
              <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
            </a>

            <a href="www.linkedin.com/in/ricardo-gabriel-rouco">
              {" "}
              <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} />{" "}
            </a>
          </div>

          {/* Juli */}
          <div className={s.card}>
            <div className={s.divImg}>
              <img className={s.img} src={imgJuli} alt="img" />
            </div>
            <h3 className={s.apodo}>JULI</h3>
            <h2 className={s.nombreCompleto}>Julián Giampetri</h2>

            <a href="https://github.com/jgiampe">
              {" "}
              <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/joaquin-santiago-oliveira">
              {" "}
              <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} />{" "}
            </a>
          </div>
          {/* Manu */}
          <div className={s.card}>
            <div className={s.divImg}>
              <img className={s.img} src={imgManu} alt="img" />
            </div>
            <h3 className={s.apodo}>MANU</h3>
            <h2 className={s.nombreCompleto}>Manuel Mitacc</h2>

            <a href="https://github.com/mmitacc">
              {" "}
              <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/joaquin-santiago-oliveira">
              {" "}
              <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} />{" "}
            </a>
          </div>

          {/* Alfre */}
          <div className={s.card}>
            <div className={s.divImg}>
              <img className={s.img} src={imgAlfredo} alt="img" />
            </div>
            <h3 className={s.apodo}>Alfi (mane</h3>
            <h2 className={s.nombreCompleto}>Alfredo APELLIDO AQUI</h2>

            <a href="https://github.com/alfredocgn">
              {" "}
              <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/joaquin-santiago-oliveira">
              {" "}
              <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} />{" "}
            </a>
          </div>
          {/* Die */}
          <div className={s.card}>
            <div className={s.divImg}>
              <img className={s.img} src={imgDiego} alt="img" />
            </div>
            <h3 className={s.apodo}>Die</h3>
            <h2 className={s.nombreCompleto}>Diego APELLIDO AQUI</h2>

            <a href="https://github.com/diegohp141">
              {" "}
              <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/joaquin-santiago-oliveira">
              {" "}
              <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} />{" "}
            </a>
          </div>
          {/* Mauri */}
          <div className={s.card}>
            <div className={s.divImg}>
              <img className={s.img} src={imgMauri} alt="img" />
            </div>
            <h3 className={s.apodo}>Mauri</h3>
            <h2 className={s.nombreCompleto}>Mauricio Salerno</h2>

            <a href="https://github.com/mlsalerno">
              {" "}
              <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/mauricio-salerno-b06640221/">
              {" "}
              <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} />{" "}
            </a>
          </div>
          {/* Clau */}
          <div className={s.card}>
            <div className={s.divImg}>
              <img className={s.img} src={imgClau} alt="img" />
            </div>
            <h3 className={s.apodo}>Cla</h3>
            <h2 className={s.nombreCompleto}>Claudio Peralta</h2>

            <a href="https://github.com/claperalta">
              {" "}
              <AiFillGithub className={s.gitHub} icon={AiFillGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/joaquin-santiago-oliveira">
              {" "}
              <AiFillLinkedin className={s.linkedin} icon={AiFillLinkedin} />{" "}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
