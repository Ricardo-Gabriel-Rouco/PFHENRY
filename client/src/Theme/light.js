import { createTheme } from "@mui/material";

//paleta
const light = createTheme({
  palette: {
    mode: "light",
    typography: {
      fontFamily:'Celtic MD'},
    fontSizes: {
      title: '5vw',
      secondTitle: '20px',
      thirdTitle: '14px'
    },
    primary: {
      main: "#ffc400",
      contrastText: "#fff9c4",
    },
    secondary: {
      main: "#e4704c",
      contrastText: "#FFF8E1",
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
      shiny: "#ffffff",
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
