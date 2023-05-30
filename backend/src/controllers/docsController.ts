import { Request, Response } from "express";
import { document } from "../models/documentSchema";
import dotenv from 'dotenv';
import path from 'path';
var jwt = require('jsonwebtoken');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const privateKey = process.env.PRIVATE_KEY;

const saveDocDetails = async(req:Request, res:Response)=>{
    try {
        const {token, docName, docType, docSize, link} = req.body
        const address = jwt.verify(token, privateKey).address
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
        const token = req.query.token
        const address = jwt.verify(token, privateKey).address
        const docs = await document.find({address})
        res.send(docs).status(200)
    } catch (error) {
        res.send("Internal Server Error").status(500)
    }
}

const deleteDocument = async (req:Request, res:Response) => {
    try {
      const documentID = req.params.id;
      await document.deleteOne({ _id: documentID }); // Assuming "Document" is the mongoose model representing your document
  
      res.status(200).send("Document deleted");
    } catch (err:any) {
      res.status(500).send(err?.message);
    }
  };
  

export {saveDocDetails,fetchAllDocuemnts,deleteDocument}