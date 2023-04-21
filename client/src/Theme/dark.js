import { createTheme } from "@mui/material";

const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
      contrastText: "#fff9c4",
    },
    secondary: {
      main: "#e4704c",
      contrastText: "#FFCDD2",
    },
    warning: {
      main: "#fd7373",
    },
    info: {
      main: "#c79e3f",
    },
    divider: "#a1887f",
    text: {
      primary: "#fff59d",
      secondary: "#fff8e1",
      disabled: "rgba(255,255,255,0.07)",
      shiny: "#ffffff",
    },
    success: {
      main: "#857e61",
      contrastText: "#d7ccc8",
    },
    error: {
      main: "#ffc400",
    },
    background: {
      default: "#1e120e",
      paper: "#251a17",
    },
  },
});
export default dark;
