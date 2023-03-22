import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import About from '../About';
import style from './Landing.module.css';



const Landing = () => {
    function scrollToAbout() {
        const about = document.getElementById("about");
        if (about) {
            about.scrollIntoView({ behavior: "smooth" });
        }
    }
    return (
        <>
                <section id="landing">
            <div className={style.container}>
                <FaChevronDown onClick={(e) => scrollToAbout()} className={style.flecha} />
                        <div>
                            <Link to='home'>
                                <button className={style.btn}> Enter </button>
                            </Link>
                    </div>
            </div>
                </section>

            <About />
        </>
    );
}


export default Landing;