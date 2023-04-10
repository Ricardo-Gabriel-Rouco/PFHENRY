import { createTheme } from "@mui/material";

const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffc400",
      light: "#fbce6d",
      dark: "#daa306",
      contrastText: "#2b1c1a",
    },
    secondary: {
      main: "#e4704c",
      contrastText: "#ffcdd2",
    },
    warning: {
      main: "#fd7373",
    },
    info: {
      main: "#857E61",
    },
    divider: "rgba(76,42,30,0.68)",
    text: {
      primary: "#522806",
      secondary: "#3e2723",
      hint: "#331e1e",
    },
    success: {
      main: "#C79E3F",
    },
    background: {
      default: "#fff9c4",
      paper: "#fffde7",
    },
    error: {
      main: "#31231E",
    },
  },
});

export default light;
