import SearchBar from '../SearchBar/SearchBar'
import style from './NavBar.module.css'
import {Link} from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

const NavBar = () => {

    return (
        <div className={style.NavBarContainer}>
            
        <nav className={style.NavBar}>
            <div className={style.NavBarLogo}>
            <Link to='/home'><HomeOutlinedIcon/></Link>
            </div>
            <div className={style.NavBarButtons}>
            <Link to='/cart' className={style.NavBarButton}><ShoppingCartOutlinedIcon/></Link>
            <Link to='/login' className={style.NavBarButton}><AccountCircleOutlinedIcon/></Link>                  
            <Link to='/favorites' className={style.NavBarButton}><BookmarkOutlinedIcon /> </Link> 
            <Link to='/about' className={style.NavBarButton}>About Us</Link>                  
            </div>
        </nav>
            <SearchBar placeholder="Enter a value..."/>
        </div>


    );
}

export default NavBar;