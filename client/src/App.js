import "./App.css";
/* import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfiguration'; */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Views/Landing';
import Home from './Views/Home';
import About from './Views/About';
import Error from './Views/Error';
/* import Detail from './components/CardDetail'; */

function App() {
  /* const app = initializeApp(firebaseConfig) */
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        {/* <Route path='/home/:id' element={<Detail />} /> */}
        <Route path='*' element={<Error />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
