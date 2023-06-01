import React from 'react'
import SendModal from './SendModal'

export default function Send() {
  return (
    <div className='sendOuter'>
        <SendModal />
        <div className='sendInner'>
            <div className='sendInnerTop'>
                <h1>Send Documents</h1>
                <p>Send document to any wallet address linked with Blockvault</p>
                <input type='text' className='SearchInput' placeholder='Enter Username or address'></input>
            </div>
            <div className='sendInnerLower'>
                
                <h2>Send history &nbsp; <i className="bi bi-clock-history"></i></h2>
            </div>
        </div>
    </div>
  )
}
