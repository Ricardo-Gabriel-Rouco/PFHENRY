import SearchBar from '../SearchBar/SearchBar'
import style from './NavBar.module.css'
import {Link} from 'react-router-dom'
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Home from '@mui/icons-material/Home';
import { AppBar,Box,IconButton,Toolbar } from '@mui/material';



const NavBar = () => {

    return (


        <Box sx={{flexGrow:1}}>
                <AppBar position='static' className={style.NavBar}>
                    <Toolbar className={style.Toolbar}>
                        <IconButton 
                        size='large' 
                        edge='start' 
                        aria-label='home'
                        color='inherit'
                        sx={{mr:2}}
                        >
                            <Link to='/home' className={style.NavBarButton}><Home/></Link>
                        </IconButton>
                                <IconButton
                                size='large'
                                aria-label='buttons'
                                sx={{mr:2}}
                                color='inherit'
                                className={style.NavBarIcons}
                                >
                                    <Link to='/cart' className={style.NavBarButton}><ShoppingCart/></Link>
                                    <Link to='/login' className={style.NavBarButton}><AccountCircle/></Link> 
                                    <Link to='/create' className={style.NavBarButton}><AddCircleOutlineIcon/></Link>
                                    <Link to='/favorites' className={style.NavBarButton}><BookmarkOutlinedIcon /> </Link> 
                                    
                                </IconButton>
                    </Toolbar>
                </AppBar>
            <SearchBar placeholder="Enter a value..."/>
        </Box>


    );
}

export default NavBar;