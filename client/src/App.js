import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home";
import About from "./Views/About";
import Error from "./Views/Error";
import CardDetail from './components/CardDetail/CardDetail'; 
import Favorites from './Views/Favorites/Favorites'
import AddBooks from './Views/AddBooks/AddBooks'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route path='/home/:id' element={<CardDetail />} /> 


          <Route path="*" element={<Error />} />
          <Route exact path="/create" element={<AddBooks/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
