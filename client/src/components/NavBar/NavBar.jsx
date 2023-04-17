import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Home from "@mui/icons-material/Home";
import { AppBar, Box, IconButton, Toolbar, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import LoginIcon from '@mui/icons-material/Login'
import { useDispatch, useSelector } from "react-redux";
// import { logUserOut } from "../../redux/rootReducer/userSlice";
import { Badge } from "@mui/material";
import { reset } from "../../redux/rootReducer/bookSlice";
import { toogleCart } from "../../redux/rootReducer/toogleSlice";
import { toogleFav } from "../../redux/rootReducer/toogleFavSlice";
import { postCart } from "../../firebase/firestore/cart";
import { postFav } from "../../firebase/firestore/favorites";
import { removeAllProducts } from "../../redux/rootReducer/cartSlice";
import { removeAllFavorites } from "../../redux/rootReducer/favoriteSlice";
import { importBooks } from "../../redux/actions/booksActions";
import light from "../../Theme/light";
import dark from "../../Theme/dark";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import ChatIcon from "@mui/icons-material/Chat";
import { availableItems } from "../Cart/Cart";

const NavBar = ({ passTheme, mode }) => {
  const { userStatus } = useAuth();
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const favorites = useSelector((state) => state.favorite.favorites);
  const cart = useSelector((state) => state.cart);
  const displayableBooks = useSelector((state) => state.books.displayableBooks);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    await postCart(cart.cart.cart, userStatus.userId);
    await postFav(favorites.favorites, userStatus.userId);
    logout();
    dispatch(removeAllProducts());
    dispatch(removeAllFavorites());
  };

  //Estableciendo modos de Theme para el py

  useEffect(() => {
    dispatch(importBooks());
  }, [dispatch]);

  return (
    location.pathname !== "/" &&
    location.pathname.slice(0, 6) !== "/admin" && (
      <Box sx={{ bgcolor: "secondary", p: 1, marginTop: "auto 0px" }}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Grid container>
              <Grid item xs={12} sm={true} md={true} lg={true} xl={true}>
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="home"
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => navigate("/home")}
                >
                  <Home />
                </IconButton>
              </Grid>

              <Grid item xs="auto">
                <Box
                  sx={{
                    width: "475px",
                    padding: "0px",
                  }}
                >
                  <SearchBar />
                </Box>
              </Grid>

              {userStatus.role === "ADMIN" ? (
                <Grid item xs={12} sm={true} md={true} lg={true} xl={true}>
                  <IconButton
                    size="large"
                    edge="start"
                    aria-label="admin"
                    sx={{ mr: 2 }}
                    color="inherit"
                    onClick={() => navigate("/admin")}
                  >
                    <AdminPanelSettingsIcon />
                  </IconButton>
                </Grid>
              ) : null}
              {userStatus.role === "ADMIN" ? (
                <Grid item xs={12} sm={true} md={true} lg={true} xl={true}>
                  <IconButton
                    size="large"
                    edge="start"
                    aria-label="admin"
                    sx={{ mr: 2 }}
                    color="inherit"
                    onClick={() => navigate("/support")}
                  >
                    <ChatIcon />
                  </IconButton>
                </Grid>
              ) : null}
              {mode === light ? (
                <Grid item xs={12} sm={true} md={true} lg={true} xl={true}>
                  <IconButton
                    size="large"
                    edge="start"
                    aria-label="home"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => passTheme(dark)}
                  >
                    <ModeNightIcon />
                  </IconButton>
                </Grid>
              ) : (
                <Grid item xs={12} sm={true} md={true} lg={true} xl={true}>
                  <IconButton
                    size="large"
                    edge="start"
                    aria-label="home"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => passTheme(light)}
                  >
                    <LightModeIcon />
                  </IconButton>
                </Grid>
              )}

              <Grid item xs={12} sm={true} md={true} lg={true} xl={true}>
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="buttons"
                  sx={{ mr: 2 }}
                  color="inherit"
                  onClick={() => dispatch(toogleFav())}
                >
                  <Badge
                    badgeContent={
                      favorites &&
                      displayableBooks.filter((book) =>
                        favorites.favorites.includes(book.id)
                      ).length
                    }
                  >
                    <BookmarkOutlinedIcon />
                  </Badge>
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={true} md={true} lg={true} xl={true}>
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="buttons"
                  sx={{ mr: 2 }}
                  color="inherit"
                  onClick={() => dispatch(toogleCart())}
                >
                  <Badge
                    badgeContent={availableItems(displayableBooks, cart).length}
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Grid>

              {/* {userStatus.logged ? ( */}
              <Grid item xs={12} sm={true} md={true} lg={true} xl={true}>
                <IconButton
                  size="large"
                  edge="start"
                  sx={{ mr: 2 }}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  color="inherit"
                >
                  {userStatus.logged ? (
                    <>
                      <MenuItem
                        onClick={() => {
                          navigate("/profile");
                          handleClose();
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/account");
                          handleClose();
                        }}
                      >
                        My Books
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          handleLogOut();
                        }}
                      >
                        Log Out
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        navigate("/login");
                        handleClose();
                      }}
                    >
                      Log In
                    </MenuItem>
                  )}
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {/* Este componente es solo para evitar que la NavBar fija pise elementos en la pagina*/}
      </Box>
    )
  );
};

export default NavBar;
