import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Entrymodal from './components/Entrymodal';
import ConfirmModal from './components/ConfirmModal';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Send from './components/Send';
import Landing from './components/Landing';
import Alert from './components/Alert';
import { useEffect } from 'react';
import EmptyComponent from './components/EmptyComponent';
import formbricks from "@formbricks/js";

if (typeof window !== "undefined") {
  formbricks.init({
    environmentId: "clj0zabr40009ma0hs7bb4cq9",
    apiHost: "https://app.formbricks.com",
    logLevel: "debug", // remove when in production
  });
}

function App() {
  const showConfirmModal = useSelector((state: RootState) => state.modal.showConfirmModal);
  const message = useSelector((state: RootState) => state.modal.message);
  const loadingMessage = useSelector((state: RootState) => state.modal.loadingMessage);
  // const onConfirm = useSelector((state: RootState) => state.modal.onConfirm);
  // const onCancel = useSelector((state: RootState) => state.modal.onCancel);

  // Get the current location
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      <Alert />
      <Entrymodal />
      {showConfirmModal && (
        <ConfirmModal
          message={message}
          loadingMessage={loadingMessage}
        // onConfirm={onConfirm}
        // onCancel={onCancel}
        />
      )}
      <div className='d-flex'>
        {!isLandingPage && <Navigation />}
        {!isLandingPage && <EmptyComponent />}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/send' element={<Send />} />
        </Routes>
      </div>
     
    </>
  );
}

export default App;
