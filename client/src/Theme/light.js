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
      main: "#a74949",
      contrastText: "#e5e5e6",
    },
    secondary: {
      main: "#e4704c",
      contrastText: "#FFF8E1",
    },
    warning: {
      main: "#fd7373",
    },
    info: {
      main: "#857E61 ",
    },
    divider: "rgba(76,42,30,0.68)",
    text: {
      primary: "#522806",
      secondary: "#3e2723",
      hint: "#331e1e",
      shiny: "#ffffff",
    },
    success: {
      main: "#d1d1d1",
    },
    background: {
      default: "#d1d1d1",
      paper: "#e5e5e6",
    },
    error: {
      main: "#31231E",
    },
  },
});

export default light;
