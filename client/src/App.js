import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home";
import About from "./Views/About";
import Error from "./Views/Error";
import CardDetail from './components/CardDetail/CardDetail'; 
import Favorites from './Views/Favorites/Favorites'
import AddBooks from './Views/AddBooks/AddBooks'
import Login from './components/Login/Login'
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import Cart from './components/Cart/Cart'
import { useSelector } from "react-redux";
// import { useState } from "react";
import PurchaseForm from "./PurchaseForm/PurchaseForm";

function App() {
const toogleCart = useSelector(state => state.toogle)
const toogleFav = useSelector(state => state.toogleFav)
console.log(toogleFav)
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <NavBar />
        {toogleCart && <Cart />}
        {toogleFav && <Favorites />}
        <Routes>
          <Route exact path="/" element={<Landing />} />
          {/* <Route exact path="/admin" element={<AdminDashBoard />} /> */}
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/create" element={<AddBooks/>}/>
          <Route path='/home/:id' element={<CardDetail />} /> 
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register />} /> 
          <Route path='/checkout' element={<PurchaseForm/>} /> 
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
