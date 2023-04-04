import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFD600",  //FFD600
      dark: "#8a5509",
      light: "#fdd835",
    },
    secondary: {
      main: "#FDD835",
    },
    background: {
      default: "#eae8e8",
      paper: "#f7f5f5",
    },
    warning: {
      main: "#fd7373",
    },
    info: {
      main: "#ffc400",
    },
    divider: "rgba(93,64,55,0.68)",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store)
root.render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
  </PersistGate>
    </Provider>
);
