import React from 'react'

export default function Entrymodal() {

    const hideEntryModal=()=>{
        document.getElementById("EmOuter")!.style.display = "none"
    }

    return (
        <div className='EmOuter' id='EmOuter'>
            <div className='EntryModal'>
                <div className='EntryModalUpper'></div>
                <div className='EntryModalMiddle'>
                    <div className='inputDiv'>
                        <label>Enter Username</label>
                        <input type='text' placeholder='Username' />
                    </div>
                    <div className='inputDiv'>
                        <label>Enter pin</label>
                        <input type='number' placeholder='pin' />
                    </div>
                </div>
                <div className='EntryModalLower'>
                    <button className='modalBtn-inverted' onClick={hideEntryModal}>Cancel</button>
                    <button className='modalBtn'>Submit</button>
                </div>
            </div>
        </div>
    )
}
