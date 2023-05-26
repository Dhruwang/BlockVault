import './App.css';
import AppMain from './components/AppMain';
import ConfirmModal from './components/ConfirmModal';
import Entrymodal from './components/Entrymodal';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Entrymodal />
      <ConfirmModal />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<AppMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
