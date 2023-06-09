import { useDispatch } from 'react-redux'
import jwt from 'jwt-decode' 
import { alertActions } from '../store/alert';

export default function SendModalDocs({
    docName,
    docId,
    toAddress,
    setloading
}:{
    docName: string,
    docId: string,
    toAddress: string,
    setloading:any
}) {

    const dispatch = useDispatch();
    interface decodedToken {
        address: string,
        iat: number

    }
    
    const sendDocument = async()=>{
        if( !sessionStorage.getItem("token")){
            return
        }
        const decodedToken = jwt<decodedToken>(sessionStorage.getItem("token")!)
        const walletAddress = decodedToken.address
        setloading(true)
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', sessionStorage.getItem('token') || '');
            
            const response = await fetch('https://blockvault19.onrender.com/doc/transferDoc', {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                  fromAddress: walletAddress,
                  toAddress: toAddress,
                docId: docId,
              }),
            });
            
            if(response.ok){
                
                dispatch(alertActions.setAlertMessage("Document Transferred Successfully"));
                setloading(false)
                document.getElementById("sendModalOuter")!.style.display = "none"

            }
        } catch (err) {
            console.error(err);
        }
    }
    
  return (
    <div className='SendModalDocsOuter' onClick={sendDocument}>
        <div className='SendModalDocsInner d-flex'>
        <div className='docIcon'>
                        <i className="bi bi-file-text fs-2"></i>
                    </div>
                    <div className='docName'>
                        {docName}
                    </div>
        </div>
    </div>
  )
}
