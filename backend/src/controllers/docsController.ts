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

export {saveDocDetails,fetchAllDocuemnts}