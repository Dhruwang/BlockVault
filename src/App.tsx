import './App.css';
import Entrymodal from './components/Entrymodal';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Entrymodal />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Navigation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
