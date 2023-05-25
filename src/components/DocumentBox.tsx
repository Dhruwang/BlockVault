import React from 'react'

export default function DocumentBox({
    docId ,
    docType,
    docName,
    docTimestamp,
    docSize 
}:{
    docId: string,
    docType: string,
    docName: string,
    docTimestamp: string,
    docSize: any
}) {
    return (
        <div>
            <div className='documentBoxOuter'>
                <div className='documentBoxLeft'>
                    <div className='docIcon'>
                        <i className="bi bi-file-text fs-2"></i>
                    </div>
                    <div className='docName'>
                        {docName}.{docType}
                    </div>
                </div>
                <div className='documentBoxRight'>
                    <div className='docCreationDate'>
                        Created on 2020-03-20
                    </div>
                    <div className='docSize'>
                        {docSize}
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
