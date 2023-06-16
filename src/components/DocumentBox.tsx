
import { useDispatch } from 'react-redux'
import { modalActions } from '../store/ConfirmModal';
import { useState } from 'react';

export default function DocumentBox({
    docId,
    docType,
    docName,
    docTimestamp,
    docSize,
    link
}: {
    docId: string,
    docType: string,
    docName: string,
    docTimestamp: number,
    docSize: number,
    link: string
}) {

    const dispatch = useDispatch()

    const openDocument = () => {
        window.open(link, "_blank");
    }

    const handleDeleteDocument = async () => {
        try {
            dispatch(modalActions.setLoadingMessage(`Deleting ${docName} ...`))
            const res = await fetch(`http://localhost:8000/doc/deleteDoc/${docId}`, {
                method: "DELETE",
            })
                .then(res => {
                    if (res.ok) {
                        dispatch(modalActions.setShowConfirmModal(false))
                        window.location.reload()
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }


    const deleteDocument = () => {
        // dispatch(modalActions.setOnCancel(() => {
        //     dispatch(modalActions.setShowConfirmModal(false))
        // }))
        dispatch(modalActions.setMessage("Are you sure you want to delete this document?"))
        dispatch(modalActions.setShowConfirmModal(true))
        // dispatch(modalActions.setOnConfirm(() => {
        //     handleDeleteDocument()
        // }))
    }

    return (

        <div >
            <div className='documentBoxOuter'>
                <div className='documentBoxLeft' onClick={openDocument}>
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
                        {docSize + " B"}
                    </div>
                    <div className='docOptionIcon'>
                        <button onClick={deleteDocument}>
                            <i className="bi bi-trash"></i>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
