import React from 'react'

export default function DocumentBox({
    docId ,
    docType,
    docName,
    docTimestamp,
    docSize ,
    link
}:{
    docId: string,
    docType: string,
    docName: string,
    docTimestamp: number,
    docSize: number,
    link:string
}) {

    const openDocument=()=>{
            window.open(link,"_blank");
    }
    return (

        <div onClick={openDocument}>
            <div className='documentBoxOuter'>
                <div className='documentBoxLeft'>
                    <div className='docIcon'>
                        <i className="bi bi-file-text fs-2"></i>
                    </div>
                    <div className='docName'>
                        {docName}
                    </div>
                </div>
                <div className='documentBoxRight'>
                    <div className='docCreationDate'>
                        Created on 2020-03-20
                    </div>
                    <div className='docSize'>
                        {docSize+ "B"}
                    </div>
                    <div className='docOptionIcon'>
                        <button>
                        <i className="bi bi-three-dots"></i>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
