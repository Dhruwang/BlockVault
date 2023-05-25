import React, { useEffect, useState } from 'react'
import DocumentBox from './DocumentBox'

export default function Home() {

  const [selectedFile, setselectedFile] = useState<any>(null)
  const fileInput = document.getElementById('fileUpload')
  
  fileInput && fileInput.addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files;
    if(file){
      setselectedFile(file[0])
    }
  });

  const uploadFile = async()=>{
    if(!selectedFile){
      return
    }
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        body: selectedFile,
      });
      
      if (response.status === 200) {
        console.log("document uploaded successfully");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    uploadFile()
  }, [selectedFile])
  
 

  const docExampleArray = [
    {
      "docId":"dfafaf",
      "docType" : "pdf",
      "docName":"Resume",
      "docTimestamp":"dsfsfsdf",
      "docSize":"1 mb" 
  },{
      "docId":"dfafaf",
      "docType" : "pdf",
      "docName":"Marksheet",
      "docTimestamp":"dsfsfsdf",
      "docSize":"1.5 mb"    

  }
]

const handleFileUpload=()=>{
  fileInput?.click()
}



  return (
    <div>
        <div className="homeOuter">
          <div className='homeUpper'>

          </div>
         <button className='modalBtn' onClick={handleFileUpload}><i className="bi bi-upload"></i> &nbsp; <input type='file' id='fileUpload' style={{display:"none"}} multiple={false} accept=".txt,.pdf,.doc,.ppt"></input>Upload</button>
          <div className='homeLower'>
            <div className='homeLowerHead'>
              <h2>My Documents</h2>
              <div><i className="bi bi-search fs-2"></i></div>
            </div>
            <div className='homeLowerBody'>
              {docExampleArray.map((element)=>{
                  return <DocumentBox docId={element.docId} docName={element.docName} docSize={element.docSize} docTimestamp={element.docTimestamp} docType={element.docType}></DocumentBox>
              })}
            </div>
          </div>
        </div>
    </div>
  )
}
