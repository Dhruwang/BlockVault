import React from 'react'

export default function ConfirmModal({
    message,
    onConfirm,
    onCancel
}:{
    message?: string,
    onConfirm?: () => void,
    onCancel?: () => void
}) {

  return (
    <div className='confirmModalOuter' id='confirmModalOuter'>
        <div className='confirmModalInner'>
            <div className='confirmModalContent'>
                <p>{message}</p>
            </div>
            <div className='confirmModalButtons'>
                <button className='modalBtn-inverted' onClick={onCancel}>Cancel</button>
                <button className='modalBtn' onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}
