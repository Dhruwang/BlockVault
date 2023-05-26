import React, { ChangeEvent, useEffect, useState } from 'react'
import DocumentBox from './DocumentBox'
import { Web3Storage, getFilesFromPath } from 'web3.storage';

export default function Home() {

  const [selectedFile, setselectedFile] = useState<String|null>(null)
  const fileInput = document.getElementById('fileUpload')
  const token = process.env.REACT_APP_WEB3_STORAGE_API_TOKEN;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    uploadFile2()

  };

  const uploadFile = async (formData:any) => {
    if (!formData) {
      return
    }
    console.log(formData)
    try {
      fetch('http://localhost:8000/doc/uploadDocument', {
      method: 'POST',
      body: formData,
      // 👇 Set headers manually for single file upload
      
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }

  }
  const uploadFile2=async()=>{
    if(!token){
      return
    }
    const storage = new Web3Storage({ token });
    const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
        const cid = await storage.put(fileInput.files!);
        
        console.log(`https://${cid}.ipfs.dweb.link/`);
  }


  const docExampleArray = [
    {
      "docId": "dfafaf",
      "docType": "pdf",
      "docName": "Resume",
      "docTimestamp": "dsfsfsdf",
      "docSize": "1 mb"
    }, {
      "docId": "dfafaf",
      "docType": "pdf",
      "docName": "Marksheet",
      "docTimestamp": "dsfsfsdf",
      "docSize": "1.5 mb"

    }
  ]

  const handleFileUpload = () => {
    console.log("running")
    document.getElementById('fileUpload')!.click()

  }
  return (
    <div>
      <div className="homeOuter">
        <div className='homeUpper'>
        <button className='modalBtn-inverted my-4' onClick={handleFileUpload}><i className="bi bi-upload"></i> &nbsp; <input type='file' name='file' id='fileUpload' onChange={handleFileChange}  style={{ display: "none" }} multiple={false} accept=".txt,.pdf,.doc,.ppt"></input>{selectedFile?selectedFile:"Upload"}</button>
        </div>
        <div className='homeLower'>
          <div className='homeLowerHead'>
            <h2>My Documents</h2>
            <div><i className="bi bi-search fs-2"></i></div>
          </div>
          <div className='homeLowerBody'>
            {docExampleArray.map((element) => {
              return <DocumentBox docId={element.docId} docName={element.docName} docSize={element.docSize} docTimestamp={element.docTimestamp} docType={element.docType}></DocumentBox>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
