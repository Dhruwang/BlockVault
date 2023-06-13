import React, { useState, useEffect } from 'react';

const DismissableAlert = ({ message, timeout }: { message: string, timeout: number }) => {
    const [isDismissed, setIsDismissed] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 1);
        }, timeout / 100);

        return () => {
            clearInterval(interval);
        };
    }, [timeout]);

    useEffect(() => {
        if (progress >= 100) {
            dismissAlert();
        }
    }, [progress]);

    const dismissAlert = () => {
        setIsDismissed(true);
    };

    if (isDismissed) {
        return null; // Don't render the alert if it's dismissed
    }

    return (
        <div className="dismissable-alert">
            <div className='d-flex dismissable-alert-inner'>
                <div className="dismissable-alert-message">{message}</div>
                <button className="dismissable-alert-dismiss-button" onClick={dismissAlert}>
                    <i className='bi bi-x fs-2'></i>
                </button>
            </div>
            <div className="dismissable-alert-progress" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default DismissableAlert;
