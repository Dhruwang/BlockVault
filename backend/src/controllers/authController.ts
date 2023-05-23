import { Request, Response } from "express";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

var jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

// function to generate auth token using user's wallet address 
const loginUser = (req:Request, res:Response) => {
    try {
        var token = jwt.sign(req.body,privateKey);
        res.send(token).status(200);
    } catch (error) {
        res.send("Internal server error").status(500)
    }
}

export {loginUser}