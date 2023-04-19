import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home";
import About from "./Views/About";
import Error from "./Views/Error";
import CardDetail from "./components/CardDetail/CardDetail";
import Favorites from "./Views/Favorites/Favorites";
import AddBooks from "./Views/AddBooks/AddBooks";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./components/Cart/Cart";
import CardContainer from "./components/CardContainer/CardContainer";
import Account from './components/Account/Account'
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AdminDashboard } from "./Views/AdminDashboard/AdminDashboard";
import SupportAdmin from "./chatBot/SupportAdmin";
import EditUser from './components/EditUser/EditUser';
import AdminRoutes from './components/AdminRoutes/AdminRoutes';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import AboutUs from './components/AboutUs/AboutUs'
import PayStatus from "./components/PayStatus/PayStatus";
import axios from 'axios';
import { createTheme, CssBaseline, ThemeProvider, Alert } from "@mui/material";
import light from "./Theme/light";
import MyPurchases from "./components/MyPurchases/MyPurchases";
import ModalDetail from "./components/ModalDetail/ModalDetail";

axios.defaults.baseURL = 'https://shaky-friend-production.up.railway.app/';

function App() {
  const toogleCart = useSelector((state) => state.toogle);
  const toogleFav = useSelector((state) => state.toogleFav);
  const [mode, setMode] = useState(light);
  const [error, setError] = useState(null);
  const saveThemeToLocalStorage = (theme) => {
    localStorage.setItem('theme', JSON.stringify(theme.palette));
  }


  const passTheme = (themeMode) => {
    setMode(themeMode);
    saveThemeToLocalStorage(themeMode);
  };

  const loadThemeFromLocalStorage = () => {
    try {
      const palette = JSON.parse(localStorage.getItem('theme'));
      if (palette) {
        const theme = createTheme({ palette });
        setMode(theme);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    loadThemeFromLocalStorage();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={mode}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <NavBar passTheme={passTheme} mode={mode}></NavBar>
            {error && <Alert severity="error">{error}</Alert>}
            {toogleCart && <Cart />}
            {toogleFav && <Favorites />}
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/admin/*" element={
                  <AdminRoutes>
                    <AdminDashboard />
                  </AdminRoutes>
                }
              />
              <Route exact path='/support' element={
                  <AdminRoutes>
                    <SupportAdmin /> 
                  </AdminRoutes>
                }
              />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/favorites" element={<Favorites />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/create" element={
                  <AdminRoutes>
                    <AddBooks />
                  </AdminRoutes>
                }
              />
              <Route exact path="/books" element={<CardContainer />} />
              <Route path="/home/:id" element={<CardDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Error />} />
              <Route path="/profile" element={<ProtectedRoutes><EditUser/></ProtectedRoutes>}/>
              <Route path="/account" element={<Account />} />
              <Route path="/profile" element={<EditUser/>}/>
              <Route path="/purchases" element={<MyPurchases/>}/>
              <Route path="/payStatus" element={<PayStatus />}/>
              <Route path="/about" element={<AboutUs/>}/>

            </Routes>
            <ModalDetail/>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
