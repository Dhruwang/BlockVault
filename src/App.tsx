import './App.css';
import AppMain from './components/AppMain';
import Entrymodal from './components/Entrymodal';
import Landing from './components/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { lpActions } from './store/landingPage';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if(sessionStorage.getItem("walletAddress")){
      dispatch(lpActions.connectWallet(sessionStorage.getItem("walletAddress")));
    }
  }, [])
  

  return (
    <BrowserRouter>
      <Entrymodal />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<AppMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
