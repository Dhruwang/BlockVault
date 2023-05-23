"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.loginUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const userSchema_1 = require("../models/userSchema");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
var jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
// function to generate auth token using user's wallet address 
const loginUser = (req, res) => {
    try {
        var token = jwt.sign(req.body, privateKey);
        res.send(token).status(200);
    }
    catch (error) {
        res.send("Internal server error").status(500);
    }
};
exports.loginUser = loginUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.body.address;
        const username = req.body.username;
        const pin = req.body.pin;
        if (!address) {
            res.send("Address is required").status(400);
        }
        const user = new userSchema_1.User({ address, username, pin });
        try {
            yield user.save();
            res.status(201).send(user);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    catch (error) {
        console.log(error);
        res.send("Internal server error").status(500);
    }
});
exports.createUser = createUser;
