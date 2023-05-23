import { Request, Response } from "express";
import dotenv from 'dotenv';
import path from 'path';
import { User } from "../models/userSchema";
dotenv.config({ path: path.join(__dirname, '../../.env') });

var jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

// function to generate auth token using user's wallet address 
const loginUser = (req: Request, res: Response) => {
    try {
        var token = jwt.sign(req.body, privateKey);
        res.send(token).status(200);
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
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.send("Username is already taken").status(409);
            return;
        }

        const user = new User({ address, username, pin, isProfileCompleted: true })

        try {
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(500).send(error);
        }


    }
    catch (error) {
        console.log(error)
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
            res.send("User not found").status(404);
            return
        }
        res.send(user.isProfileCompleted).status(200);
    }
    catch (error) {
        res.send("Internal server error").status(500)
    }
}

export { loginUser, createUser, checkIsProfileCompleted }