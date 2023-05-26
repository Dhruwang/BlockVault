import React from 'react'

export default function ConfirmModal({
    message,
    onConfirm
}:{
    message?: string,
    onConfirm?: () => void
}) {

    const dismissModal=()=>{
        if(document.getElementById("confirmModalOuter")){
            document.getElementById("confirmModalOuter")!.style.display = "none"
        }
}
  return (
    <div className='confirmModalOuter' id='confirmModalOuter'>
        <div className='confirmModalInner'>
            <div className='confirmModalContent'>
                <p>{message}</p>
            </div>
            <div className='confirmModalButtons'>
                <button className='modalBtn-inverted' onClick={dismissModal}>Cancel</button>
                <button className='modalBtn' onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}
