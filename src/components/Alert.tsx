import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { alertActions } from '../store/alert';

export default function Alert () {
    const [isDismissed, setIsDismissed] = useState(false);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch()
    const alertMessage =useSelector((state: RootState) => state.alert.alertMessage)
    

    useEffect(() => {
      setIsDismissed(false)
      setProgress(0)
    }, [alertMessage])
    

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 1);
        }, 2000 / 100);

        return () => {
            clearInterval(interval);
            
        };
    }, [2000]);

    useEffect(() => {
        if (progress >= 100) {
            dismissAlert();
        }
    }, [progress]);

    const dismissAlert = () => {
        setIsDismissed(true); 
        dispatch(alertActions.setAlertMessage(null))
        
    };

    if (isDismissed) {
        return null; // Don't render the alert if it's dismissed
    }

    return (
        <>
        {alertMessage && <div className="dismissable-alert">
            <div className='d-flex dismissable-alert-inner'>
                <div className="dismissable-alert-message">{alertMessage} </div>
                <button className="dismissable-alert-dismiss-button" onClick={dismissAlert}>
                    <i className='bi bi-x fs-2'></i>
                </button>
            </div>
            <div className="dismissable-alert-progress" style={{ width: `${progress}%` }}></div>
        </div>}
        </>
    );
};

