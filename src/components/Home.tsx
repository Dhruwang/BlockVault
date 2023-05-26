import React, { ChangeEvent, useEffect, useState } from 'react'
import DocumentBox from './DocumentBox'
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import Spinner from './Spinner';

export default function Home() {

  const [selectedFile, setselectedFile] = useState<String | null>(null)
  const [uploadingLoader, setuploadingLoader] = useState(false)
  const fileInput = document.getElementById('fileUpload') as HTMLInputElement
  const token = process.env.REACT_APP_WEB3_STORAGE_API_TOKEN;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("File changed")
      setselectedFile(fileInput.files![0].name)
      console.log(fileInput.files![0].name)

  };

  const uploadFile = async () => {
    setuploadingLoader(true)
    if (!token) {
      return
    }
    const storage = new Web3Storage({ token });
    const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
    console.log(fileInput.files)
    // const cid = await storage.put(fileInput.files!);

    // console.log(`https://${cid}.ipfs.dweb.link/`);
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
    fileInput.value = ""
    fileInput.click()

  }
  const discardUpload = () => {
    fileInput.value = ""
    setselectedFile(null)
  }
  return (
    <div>
      <div className="homeOuter">
        <div className='homeUpper'>

          {uploadingLoader ?
            <div className='uploadingLoaderDiv'>
              <Spinner />
              <p>Uploading</p>
            </div>
            : <div className='uploadBtnDiv'>
              {selectedFile && <button className='modalBtn-inverted' onClick={discardUpload}>x</button>}
              <button className='modalBtn-inverted my-4' onClick={handleFileUpload}><i className="bi bi-upload"></i> &nbsp; <input type='file' name='file' id='fileUpload' onChange={handleFileChange} style={{ display: "none" }} multiple={false} accept=".txt,.pdf,.doc,.ppt"></input>{selectedFile ? selectedFile : "Upload"}</button>
              {selectedFile && <button className='modalBtn-inverted' onClick={uploadFile}><i className="bi bi-check"></i> </button>}
            </div>}
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
