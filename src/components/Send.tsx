import React, { SyntheticEvent, useState } from 'react'
import SendModal from './SendModal'

export default function Send() {


  const [userNotFound, setuserNotFound] = useState(false)
  const [loading, setloading] = useState(false)
  const [toAddress, settoAddress] = useState<string>("")
  const openDocumentSelectModal=()=>{
    checkAddress()
    document.getElementById("sendModalOuter")!.style.display = "flex"
  }

  const checkAddress=async()=>{
    try {
      setloading(true)
      const response = await fetch(`http://localhost:8000/auth/checkUser?address=${toAddress}`)

      if(response.status === 200){
        setuserNotFound(false)
        setloading(false)
      }
      if(response.status === 404){
        setuserNotFound(true)
        setloading(false)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange=(e:SyntheticEvent)=>{
    const target = e.target as HTMLInputElement;

    settoAddress(target.value)
  }

  return (
    <div className='sendOuter'>
        <SendModal  toAddress={toAddress} loading={loading} userNotFound={userNotFound}/>
        <div className='sendInner'>
            <div className='sendInnerTop'>
                <h1>Send Documents</h1>
                <p>Send document to any wallet address linked with Blockvault</p>
                <div className='d-flex addressInputField'>
                <input type='text' className='SearchInput' value={toAddress} onChange={handleOnChange} placeholder='Enter Username or address'></input>
                <button className='modalBtn' onClick={openDocumentSelectModal}><i className="bi bi-send-fill "></i></button>

                </div>
            </div>
            <div className='sendInnerLower'>
                
                <h2>Send history &nbsp; <i className="bi bi-clock-history"></i></h2>
            </div>
        </div>
    </div>
  )
}
