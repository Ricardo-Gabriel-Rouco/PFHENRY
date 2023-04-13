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
import { useSelector } from "react-redux";
import { useState } from "react";
import PurchaseForm from "./PurchaseForm/PurchaseForm";
import { AdminDashboard } from "./Views/AdminDashboard/AdminDashboard";
import SupportAdmin from "./chatBot/SupportAdmin";
import EditUser from './components/EditUser/EditUser'
import AdminRoutes from './components/AdminRoutes/AdminRoutes'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
// import PayStatus from "./components/PayStatus/PayStatus";
import axios from 'axios'
import { CssBaseline, ThemeProvider } from "@mui/material";
import light from "./Theme/light";
import PayStatus from "./components/PayStatus/PayStatus";
axios.defaults.baseURL = 'https://shaky-friend-production.up.railway.app/'

function App() {
  const toogleCart = useSelector((state) => state.toogle);
  const toogleFav = useSelector((state) => state.toogleFav);
  const [mode, setMode] = useState(light);
  const passTheme = (currentTheme) => {
    setMode(currentTheme);
  };

  return (
    <div className="App">
      <ThemeProvider theme={mode}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <NavBar passTheme={passTheme} mode={mode}></NavBar>
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
              <Route path="/home/:id" element={<CardDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={
                  <ProtectedRoutes>
                    <PurchaseForm />
                  </ProtectedRoutes>
                }
              />
              <Route path="*" element={<Error />} />
              <Route path="/modify" element={<ProtectedRoutes><EditUser/></ProtectedRoutes>}/>
              <Route path="/payStatus" element={<PayStatus/>}/>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
