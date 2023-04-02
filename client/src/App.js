import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home";
import About from "./Views/About";
import Error from "./Views/Error";
import CardDetail from "./components/CardDetail/CardDetail";
import Favorites from "./Views/Favorites/Favorites";
import AddBooks from "./Views/AddBooks/AddBooks";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import { AdminDashboard } from "./Views/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/admin/*" element={<AdminDashboard />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/create" element={<AddBooks />} />
          <Route path="/home/:id" element={<CardDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
