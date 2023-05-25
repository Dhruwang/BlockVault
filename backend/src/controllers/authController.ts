import { Request, Response } from "express";
import dotenv from 'dotenv';
import path from 'path';
import { User } from "../models/userSchema";
dotenv.config({ path: path.join(__dirname, '../../.env') });

var jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

// function to generate auth token using user's wallet address 
const loginUser = async(req: Request, res: Response) => {
    try {

        const user = await User.findOne(req.body)

        if(!user){
            return res.status(404).json({
                message: "User not found"
        })
        }

        var token = jwt.sign(req.body, privateKey);
        res.json({"token":token,"username":user.username}).status(200);
    } catch (error) {
        res.send("Internal server error").status(500)
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const address = req.body.address;
        const username = req.body.username;
        const pin = req.body.pin;

        if (!address) {
            res.send("Address is required").status(400);
            return
        }

        const existingAddress = await User.findOne({ address });

        if (!existingAddress) {
            const newUser = new User({ address })
            try {
                await newUser.save();
                res.status(201).send(newUser);
                return
            } catch (error) {
                res.status(500).send(error);
            }
        }
        else {
            const user = await User.findOneAndUpdate({address},{ address, username, pin, isProfileCompleted: true })
            try {
                await user.save();
                res.status(201);
            } catch (error) {
                res.status(500).send(error);
            }

        }

    }
    catch (error) {
        res.send("Internal server error").status(500)
    }
}

const checkIsProfileCompleted = async (req: Request, res: Response) => {
    try {
        const address = req.query.address
        if (!address) {
            res.send("Address is required").status(400);
            return
        }
        const user = await User.findOne({ address });
        if (!user) {
            res.json({"error":"User not found"}).status(404);
            return
        }
        res.send(user.isProfileCompleted).status(200);
    }
    catch (error) {
        res.send("Internal server error").status(500)
    }
}

const fetchUsername = (req: Request, res: Response) => {
    const address = req.query.address
    try {
        const user = req
    } catch (error) {
        
    }
}


export { loginUser, createUser, checkIsProfileCompleted }