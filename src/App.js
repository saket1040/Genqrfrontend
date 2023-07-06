import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import QrCode from './Components/QrCode';
import QrImage from './Components/QrImage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<QrCode/>}/>
        <Route path="/image" element={<QrImage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
