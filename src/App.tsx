import './App.css';
import AppMain from './components/AppMain';
import Entrymodal from './components/Entrymodal';
import Landing from './components/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { lpActions } from './store/landingPage';
import ConfirmModal from './components/ConfirmModal';
import Navigation from './components/Navigation';
import Home from './components/Home';

function App() { 

  const showConfirmModal = useSelector((state:RootState)=>state.modal.showConfirmModal)
  const message = useSelector((state:RootState)=>state.modal.message)
  const loadingMessage = useSelector((state:RootState)=>state.modal.loadingMessage)
  const onConfirm = useSelector((state:RootState)=>state.modal.onConfirm)
  const onCancel = useSelector((state:RootState)=>state.modal.onCancel)

  return (
    <BrowserRouter>
      <Entrymodal />
      {showConfirmModal && <ConfirmModal message={message} loadingMessage={loadingMessage} onConfirm={onConfirm} onCancel={onCancel}/>}
      <div className='d-flex'>
        <Navigation />
        <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      </div>
     
    </BrowserRouter>
  );
}

export default App;
