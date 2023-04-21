import { createTheme } from "@mui/material";

const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4A525A",
      contrastText: "#07070a"

    },
    secondary: {
      main: "#ffffffff",
      contrastText: "#ffffffff",
    },
    warning: {
      main: "#4A525A",
    },
    info: {
      main: "#07070a"
    },
    divider: "#07070a",
    text: {
      primary: "#ffffffff",
      secondary: "#ffffffff",
      disabled: "rgba(255,255,255,0.07)",
      shiny: "#ffffff",
    },
    success: {
      main: "#07070a", 
      contrastText:"#07070a"
    },
    error: {
      main: "#ffffffff",
    },
    background: {
      default: "#07070a",
      paper: "#07070a",

    },
  },
});
export default dark;
