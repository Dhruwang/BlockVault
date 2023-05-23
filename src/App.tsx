import './App.css';
import Entrymodal from './components/Entrymodal';
import Landing from './components/Landing';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Entrymodal />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Entrymodal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
