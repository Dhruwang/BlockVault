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
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<AppMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
