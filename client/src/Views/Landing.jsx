import { Link } from 'react-router-dom';
// import { FaChevronDown } from 'react-icons/fa';
// eslint-disable-next-line
import About from './About';



const Landing = () => {
    //POR SI USAMOS FLECHA ABAJO PARA EL ABOUT //
    /* function scrollToAbout() {
        const about = document.getElementById("about");
        if (about) {
            about.scrollIntoView({ behavior: "smooth" }); por si usamos flecha para el about
        }
    } */
    return (
        <>

            {'ESTO ES EL LANDING'}
            <Link to='home'>
                <button> Enter </button>
            </Link>

            {/*
            //POR SI USAMOS FLECHA ABAJO PARA EL ABOUT //
              <section id="landing">
                <Link to='home'>
                    <button className={style.btn}> Enter </button>
                </Link>
                <FaChevronDown onClick={(e) => scrollToAbout()} className={style.flecha} />


            </section>

            <About /> */}

        </>
    );
}


export default Landing;