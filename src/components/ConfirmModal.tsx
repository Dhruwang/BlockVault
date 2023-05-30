import React, { useState } from 'react'
import Spinner from './Spinner'

export default function ConfirmModal({
    message,
    loadingMessage,
    onConfirm,
    onCancel
}:{
    message?: string | null,
    loadingMessage? : string | null,
    onConfirm?: () => void,
    onCancel?: () => void
}) {

  return (
    <div className='confirmModalOuter' id='confirmModalOuter'>
        {loadingMessage&&< div className='modalLoadingdiv'>
                <Spinner />
                <p>{loadingMessage}</p>
            </div>}
        {!loadingMessage && <div className='confirmModalInner'>
            <div className='confirmModalContent'>
                <p>{message}</p>
            </div>
            <div className='confirmModalButtons'>
                <button className='modalBtn-inverted' onClick={onCancel}>Cancel</button>
                <button className='modalBtn' onClick={onConfirm}>Confirm</button>
            </div>
        </div>}
    </div>
  )
}
