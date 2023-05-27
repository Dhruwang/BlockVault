import { Request, Response } from "express";
import { document } from "../models/documentSchema";

const saveDocDetails = async(req:Request, res:Response)=>{
    try {
        const {address, docName, docType, docSize, link} = req.body
        const doc = new document({
            address, docName, docType, docSize, link
        })
        try{
            const res =await doc.save()
            res.send(doc)
        }
        catch(err){
            res.send(err)
        }

    } catch (error) {
        res.send(error)
    }
}

const fetchAllDocuemnts = async (req:Request, res:Response) => {
    try {
        const address = req.query.address
        const doc = await document.find({address})
        res.send(doc).status(200)
    } catch (error) {
        res.send("Internal Server Error").status(500)
    }
}

export {saveDocDetails,fetchAllDocuemnts}