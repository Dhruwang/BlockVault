import { Request, Response, response } from "express";
import { document } from "../models/documentSchema";
import { User } from "../models/userSchema";
import dotenv from 'dotenv';
import path from 'path';
import { transferRecords } from "../models/transferSchema";
import mongoose from "mongoose";
var jwt = require('jsonwebtoken');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const privateKey = process.env.PRIVATE_KEY;

const saveDocDetails = async (req: Request, res: Response) => {
    try {
        const { token, docName, docType, docSize, link } = req.body
        const address = jwt.verify(token, privateKey).address
        const doc = new document({
            address, docName, docType, docSize, link
        })
        try {
            const res = await doc.save()
            res.send(doc)
        }
        catch (err) {
            res.send(err)
        }

    } catch (error) {
        res.send(error)
    }
}

const fetchAllDocuemnts = async (req: Request, res: Response) => {
    try {
        const token = req.query.token
        const address = jwt.verify(token, privateKey).address
        const docs = await document.find({ address })
        res.send(docs).status(200)
    } catch (error) {
        res.send("Internal Server Error").status(500)
    }
}

const deleteDocument = async (req: Request, res: Response) => {
    try {
        const documentID = req.params.id;
        await document.deleteOne({ _id: documentID }); // Assuming "Document" is the mongoose model representing your document

        res.status(200).send("Document deleted");
    } catch (err: any) {
        res.status(500).send(err?.message);
    }
};

const transferDocument = async (req: Request, res: Response) => {
    try {
        const { fromAddress, toAddress, docId } = req.body;
        // adding to db of user to which document is sent
        let documentToTransfer = {}
        try {
            documentToTransfer = await document.findOne({ _id: docId });
        } catch (error) {
            response.send(error);
        }

        const newTransferRecord = new transferRecords({
            fromAddress, toAddress, docId
        }) 
        const transferRecordCreated = await newTransferRecord.save()

        if(transferRecordCreated){
            // adding transfer record id to from User 
            const fromUser = await User.findOne({address:fromAddress})
            if(!fromUser){
                res.json({"error":"User not found"})
                return
            }
            fromUser.transfers.push(transferRecordCreated._id)
            fromUser.save()

            // similarly adding to transfer records of to User 
            const toUser = await User.findOne({address:toAddress})
            if(!toUser) {
                res.json({"error":"User not found"})
                return
            }
            toUser.transfers.push(transferRecordCreated._id)
            toUser.save()
        }
        res.send("document transfered successfully").status(200)
    } catch (error) {
        res.send(error)
    }
}


const fetchTransferedDocuments = async(req: Request, res: Response)=>{
    try{
        const token = req.headers.authorization;
        const userAddress = jwt.verify(token, privateKey).address
        let transferRecordsArray: string[] = [];
        let documentArray: any[] = []

        const user = await User.findOne({address: userAddress})
        if(!user){
            res.status(404).send("user not found")
        }
        if(user.transfers){
            transferRecordsArray = user.transfers
        }
        for (const element of transferRecordsArray) {
            try {
            const transRecord = await transferRecords.findById(element);
            if(transRecord){
                const doc = await document.findById(transRecord.docId)
                documentArray.push(doc);
            }
            } catch (error) {
              res.status(500).json({ error: "Error finding document in the database" });
              return;
            }
          }
        res.send(documentArray)
    }
    catch (error) {
        res.send(error)
    }
}
export { saveDocDetails, fetchAllDocuemnts, deleteDocument, transferDocument, fetchTransferedDocuments }