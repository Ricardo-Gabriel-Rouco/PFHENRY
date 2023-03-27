import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home";
import About from "./Views/About";
import Error from "./Views/Error";
// por ahora estoy probando con esta data para ver el tema de la firestore
// import db from './firebase-config'
// import {onSnapshot, collection} from 'firebase/firestore'
// import { useEffect } from "react";
import CardDetail from './components/CardDetail/CardDetail'; 
import BookForm from "./components/BookForm/BookForm";


function App() {
  // useEffect(() => {
  // en este caso tenemos dos opciones, usamos getData o onSnapshot, la diferencia es que cada vez que se actualiza la db, onSnapshot envia la data nueva sin necesidad de un refresh

  //   onSnapshot(collection(db, 'books'), (snapshot) =>{
  //     console.log(snapshot.docs.map((doc) => (doc.data()) ))
  //   })
  // }, [onSnapshot])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/home/:id" element={<CardDetail />} />
          <Route path="*" element={<Error />} />
          <Route exact path="/create" element={<BookForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
