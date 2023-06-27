import React, { useEffect, useState } from 'react'
import SendModalDocs from './SendModalDocs'
import Spinner from './Spinner'

export default function SendModal({
  toAddress,
  loading,
  userNotFound,
  setloading
}: {
  toAddress: string,
  loading: boolean,
  userNotFound: boolean,
  setloading:any
}) {

  const [documentArray, setdocumentArray] = useState<any[]>([])

  const closeDocumentSelectModal = () => {
    document.getElementById("sendModalOuter")!.style.display = "none"
  }

  const fetchAllDocuments = async () => {
    try {
      const response = await fetch(`https://blockvault19.onrender.com/doc/getAllDocuments?token=${sessionStorage.getItem('token')}`)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setdocumentArray(data)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchAllDocuments()
  }, [])



  return (
    <div className='sendModalOuter' id='sendModalOuter'>
      {loading ?
        <Spinner />
        : <div className='sendModalInner' >
          <div className='sendModalHead' id='sendModalHead'>
            <h2>{userNotFound?"User not Found":"Select Documents to send "}</h2>
            <i className='bi bi-x fs-1' onClick={closeDocumentSelectModal}></i>
          </div>
          <div className='docContainer'>
            {!userNotFound && documentArray && documentArray.map((element) => {
              return <SendModalDocs docName={element.docName} docId={element._id} toAddress={toAddress} setloading={setloading} />
            })}

          </div>
        </div>}
    </div>
  )
}
