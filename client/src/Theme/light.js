import { createTheme } from "@mui/material";

const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffc400",
    },
    secondary: {
      main: "#0091ea",
    },
    background: {
      default: "#fff9c4",
      paper: "#fffde7",
    },
    info: {
      main: "#4fc3f7",
    },
    success: {
      main: "#66bb6a",
    },
  },
});

export default light;
