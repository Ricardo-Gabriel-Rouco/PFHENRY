import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Home from "@mui/icons-material/Home";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import LoginIcon from '@mui/icons-material/Login'
import { useDispatch, useSelector } from "react-redux";
// import { logUserOut } from "../../redux/rootReducer/userSlice";
import { Badge } from '@mui/material';
import { reset } from "../../redux/rootReducer/bookSlice";
import { toogleCart } from '../../redux/rootReducer/toogleSlice';
import { toogleFav } from '../../redux/rootReducer/toogleFavSlice'


const NavBar = () => {

  const { userStatus } = useAuth();
  const { logout } = useAuth();
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const favorites = useSelector(state => state.favorite.favorites);
  const cart = useSelector(state => state.cart);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    logout();
    alert("Session was closed");
  };

  const goHome = () => {
    if (location.pathname === '/home')
      dispatch(reset())
    else
      navigate('/home')
  }

  return (((location.pathname !== '/') && (location.pathname.slice(0,6) !== '/admin')) &&
    <Box sx={{ flexGrow: 1, bgcolor: "#F9B52E", color: "#F7F6F6", p: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={authorized}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={authorized ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <AppBar position="sticky" color="secondary">
        <Box>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="home"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={goHome}
            >
              <Home sx={{ color: "#F7F6F6" }} />
            </IconButton>


            {location.pathname !== "/create" ? (
              <Box sx={{ width: "55rem", marginInline: "40px" }}>
                <SearchBar
                  placeholder="Search your book..."
                />
              </Box>
            ) : null}

            {userStatus.role === 'ADMIN' ? <IconButton
              size="large"
              edge="start"
              aria-label="bottom"
              sx={{ mr: 2 }}
              color="inherit"
            >
              <Link to="/create">
                <AddCircleOutlineIcon sx={{ color: "#F7F6F6" }} />
              </Link>
            </IconButton> : null}

            <IconButton
              size="large"
              edge="start"
              aria-label="buttons"
              sx={{ mr: 2 }}
              color="inherit"
            >


              <Badge badgeContent={favorites && favorites.favorites.length} color="info">
                  <BookmarkOutlinedIcon onClick = {() => dispatch(toogleFav())} sx={{ color: "#F7F6F6" }} />{" "}
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              aria-label="buttons"
              sx={{ mr: 2 }}
              color="warning"
            >

              <Badge badgeContent={cart && cart.cart.cart.length} color="info">
                <ShoppingCart onClick={() => dispatch(toogleCart())} sx={{ color: "#F7F6F6" }} />
              </Badge>
            </IconButton>


            {/* {userStatus.logged ? ( */}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle sx={{ color: "#F7F6F6" }} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "botton",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {userStatus.logged ? (
                  <>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <Link to={"/login"}>Log In</Link>
                  </MenuItem>
                )}
              </Menu>
            </div>
          </Toolbar>
        </Box>
      </AppBar >
    </Box >
  );
};

export default NavBar;

// ) :
// (<Link to={'/login'}>
//   <LoginIcon sx={{ color: "#F7F6F6" }}/>
// </Link>)}
