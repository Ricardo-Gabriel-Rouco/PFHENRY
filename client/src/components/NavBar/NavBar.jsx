import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import * as React from "react";
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
// import LoginIcon from "@mui/icons-material/Login";

const NavBar = ({ paginated }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { userStatus } = useAuth();
  const { logout } = useAuth();

  const location = useLocation();

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
  return (location.pathname!=='/'&&
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
      <AppBar position="static" color="secondary">
        <Box>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="home"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <Link to="/home">
                <Home sx={{ color: "#F7F6F6" }} />
              </Link>
            </IconButton>

            {location.pathname !== "/create" ? (
              <Box sx={{ width: "55rem", marginInline: "40px" }}>
                <SearchBar
                  paginated={paginated}
                  placeholder="Search your book..."
                />
              </Box>
            ) : null}

            {userStatus.role === 'ADMIN' ? <IconButton
              size="large"
              edge="start"
              aria-label="buttons"
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
              <Link to="/favorites">
                <BookmarkOutlinedIcon sx={{ color: "#F7F6F6" }} />{" "}
              </Link>
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              aria-label="buttons"
              sx={{ mr: 2 }}
              color="warning"
            >
              <Link to="/cart">
                <ShoppingCart sx={{ color: "#F7F6F6" }} />
              </Link>
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
      </AppBar>
    </Box>
  );
};

export default NavBar;

// ) :
// (<Link to={'/login'}>
//   <LoginIcon sx={{ color: "#F7F6F6" }}/>
// </Link>)}
