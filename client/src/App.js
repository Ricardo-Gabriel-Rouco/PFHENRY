import "./App.css";
import {initializeApp} from 'firebase/app'
import firebaseConfig from './firebaseConfiguration'

function App() {
  const app = initializeApp(firebaseConfig)
  return (
    <div className="App">
      <h1>Template</h1>
    </div>
  );
}

export default App;
