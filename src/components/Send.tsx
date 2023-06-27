import React, { SyntheticEvent, useEffect, useState } from 'react'
import SendModal from './SendModal'
import SendHistoryDocBox from './SendHistoryDocBox'
import jwt from 'jwt-decode'
import NoTransferRecords from './NoTransferRecords'

export default function Send() {


  const [userNotFound, setuserNotFound] = useState(false)
  const [loading, setloading] = useState(false)
  const [toAddress, settoAddress] = useState<string>("")


  const openDocumentSelectModal=()=>{
    if(toAddress === fromAddress){
      (document.getElementById("documentSendBtn") as HTMLButtonElement).disabled = true;
      document.getElementById("cannotSelfSendWarning")!.style.display = "block"
      return
    }
    checkAddress()
    document.getElementById("sendModalOuter")!.style.display = "flex"
  }
  const [sendHistory, setsendHistory] = useState<any>([])
  interface decodedToken {
    address: string,
    iat: number
}
const [fromAddress, setfromAddress] = useState<string>("")

  const checkAddress=async()=>{
    try {
      setloading(true)
      const response = await fetch(`https://blockvault19.onrender.com/auth/checkUser?address=${toAddress}`)

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

  const fetchTransferRecords = async()=>{
    console.log("fetching docs")
    try {

      const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', sessionStorage.getItem('token') || '');

      const response = await fetch("https://blockvault19.onrender.com/doc/getDocTransfers",{
        method: "GET",
        headers
      })

      const resJson = await response.json()
      console.log(resJson)

      setsendHistory(resJson)
    } catch (error) {
      
    }
  }

  const handleOnChange=(e:SyntheticEvent)=>{
    const target = e.target as HTMLInputElement;
    document.getElementById("cannotSelfSendWarning")!.style.display = "none"
    settoAddress(target.value)
  
  }

  useEffect(() => {
    fetchTransferRecords()
    setfromAddress(jwt<decodedToken>(sessionStorage.getItem("token")!).address)
  }, [])
  

  return (
    <div className='sendOuter'>
        <SendModal  toAddress={toAddress} loading={loading} userNotFound={userNotFound} setloading={setloading}/>
        <div className='sendInner'>
            <div className='sendInnerTop'>
                <h1>Send Documents</h1>
                <p>Send document to any wallet address linked with Blockvault</p>
                <div className='d-flex addressInputField'>
                <input type='text' className='SearchInput' value={toAddress} onChange={handleOnChange} placeholder='Enter Username or address'></input>
                <button className='modalBtn' id='documentSendBtn' onClick={openDocumentSelectModal}><i className="bi bi-send-fill "></i></button>
                </div>
                <p className='warnings' id='cannotSelfSendWarning'>Cannot send files to your own address</p>
            </div>
            <div className='sendInnerLower'>
                
                <h2>Send history &nbsp; <i className="bi bi-clock-history"></i></h2>
                <div className='sendHistoryContainer'>
                  {sendHistory && sendHistory.length>0 && sendHistory.map((record:any)=>{
                    return <SendHistoryDocBox toAddress={record.address} docName={record.docName}/>
                  })}
                  {sendHistory && sendHistory.length===0 && <NoTransferRecords />}
                </div>
            </div>
        </div>
    </div>
  )
}
