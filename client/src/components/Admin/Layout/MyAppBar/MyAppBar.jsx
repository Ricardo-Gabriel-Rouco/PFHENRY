import { AppBar, TitlePortal, defaultTheme, ToggleThemeButton } from "react-admin";
import { Box, IconButton } from "@mui/material";
import Home from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

import dark from "../../../../Theme/dark"
import light from "../../../../Theme/light"

export const MyAppBar = () => {

    const navigate = useNavigate()
  
    const goHome = () => {
        navigate("/home");
      };
  
    return (
    <AppBar color="primary">
      <IconButton
        size="large"
        edge="start"
        aria-label="home"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={goHome}
      >
        <Home />
      </IconButton>
      <Box flex="1" />
      <TitlePortal />
      <Box flex="1" />
      <ToggleThemeButton lightTheme={light} darkTheme={dark} />
    </AppBar>
  );
};
