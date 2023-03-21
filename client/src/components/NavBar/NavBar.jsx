import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
const NavBar = () => {
    return (
        <>
        <Link to='/home'> <button>Home </button></Link>
        Esto es NavBar
        Esto es SB: <SearchBar />
        </>

    );
}

export default NavBar;