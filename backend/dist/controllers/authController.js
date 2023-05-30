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
exports.checkIsProfileCompleted = exports.createUser = exports.loginUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const userSchema_1 = require("../models/userSchema");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
var jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
// function to generate auth token using user's wallet address 
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.User.findOne(req.body);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        var token = jwt.sign(req.body, privateKey);
        res.json({ "token": token, "username": user.username }).status(200);
    }
    catch (error) {
        res.send("Internal server error").status(500);
    }
});
exports.loginUser = loginUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.body.address;
        const username = req.body.username;
        const pin = req.body.pin;
        if (!address) {
            res.send("Address is required").status(400);
            return;
        }
        const existingAddress = yield userSchema_1.User.findOne({ address });
        if (!existingAddress) {
            const newUser = new userSchema_1.User({ address });
            try {
                yield newUser.save();
                res.status(201).send(newUser);
                return;
            }
            catch (error) {
                res.status(500).send(error);
            }
        }
        else {
            const user = yield userSchema_1.User.findOneAndUpdate({ address }, { address, username, pin, isProfileCompleted: true });
            console.log("running");
            try {
                yield user.save();
                var token = jwt.sign({ address }, privateKey);
                res.json({ "token": token, "username": username }).status(201);
                return;
            }
            catch (error) {
                res.status(500).send(error);
            }
        }
    }
    catch (error) {
        res.send("Internal server error").status(500);
    }
});
exports.createUser = createUser;
const checkIsProfileCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.query.address;
        if (!address) {
            res.send("Address is required").status(400);
            return;
        }
        const user = yield userSchema_1.User.findOne({ address });
        if (!user) {
            res.json({ "error": "User not found" }).status(404);
            return;
        }
        res.send(user.isProfileCompleted).status(200);
    }
    catch (error) {
        res.send("Internal server error").status(500);
    }
});
exports.checkIsProfileCompleted = checkIsProfileCompleted;
const fetchUsername = (req, res) => {
    const address = req.query.address;
    try {
        const user = req;
    }
    catch (error) {
    }
};
