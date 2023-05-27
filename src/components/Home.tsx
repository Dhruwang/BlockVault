import { ChangeEvent, useEffect, useState } from 'react'
import DocumentBox from './DocumentBox'
import { Web3Storage } from 'web3.storage';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Home() {

  const [selectedFile, setselectedFile] = useState<String | null>(null)
  const [uploadingLoader, setuploadingLoader] = useState(false)

  interface document{
    _id: string;
    docName: string;
    docSize: number;
    docTimestamp: number;
    docType: string;
    link:string
  }

  const [doumentArray, setdoumentArray] = useState<document[]>([])

  interface DocumentDetails {
    name: string;
    size: number;
    type: string;
  }

  const [documentdetails, setdocumentdetails] = useState<DocumentDetails>({
    name:"",
    size:0,
    type:""
  })
  const walletAddress = useSelector((state: RootState) => state.lp.walletAddress)
  const token = process.env.REACT_APP_WEB3_STORAGE_API_TOKEN;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = (document.getElementById("fileUpload") as HTMLInputElement)
      setselectedFile(fileInput.files![0].name)
      setdocumentdetails({
        name:fileInput.files![0].name,
        size:fileInput.files![0].size,
        type:fileInput.files![0].type
      })

  };

  const uploadFile = async () => {
    setuploadingLoader(true)
    if (!token) {
      return
    }
    const storage = new Web3Storage({ token });
    const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
    const cid = await storage.put(fileInput.files!);

    if(cid){
      setuploadingLoader(false);
      setselectedFile(null)
      fileInput.value = ""
      const cidlink = `https://${cid}.ipfs.dweb.link/`;
      saveDocumentDetails(cidlink)
    }

  }
  const saveDocumentDetails = async (cidlink:string) => {
   
    const docName = documentdetails.name;
    const docType = documentdetails.type;
    const docSize = documentdetails.size;
    const link = cidlink;
    try{
      const response = await fetch("http://localhost:8000/doc/saveDocDetails",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address:walletAddress,
          docName,
          docType,
          docSize,
          link
        })
      })
      if(response.ok){
        console.log("document details saved successfully")
        fetchAllDocuments();
      }
    }
    catch(err){
          console.log(err)
        }

  }
  const fetchAllDocuments = async()=>{
    try {
      const response = await fetch(`http://localhost:8000/doc/getAllDocuments?address=${walletAddress}`)
      if(response.ok){
        const data = await response.json()
        console.log(data)
        setdoumentArray(data)
      }
    } catch (error) {
      
    }
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
    
    (document.getElementById("fileUpload") as HTMLInputElement).value = ""
    document.getElementById("fileUpload")!.click()

  }
  const discardUpload = () => {
    (document.getElementById("fileUpload") as HTMLInputElement).value = ""
    setselectedFile(null)
  }

  useEffect(() => {
    fetchAllDocuments()
  }, [])
  
  return (
    <div>
      <div className="homeOuter">
        <div className='homeUpper'>
          <div className='homeUpperAnimation'>
          </div>
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
            {doumentArray && doumentArray.map((element) => {
              return <DocumentBox docId={element._id} docName={element.docName} docSize={element.docSize} docTimestamp={element.docTimestamp} docType={element.docType} link={element.link}></DocumentBox>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
