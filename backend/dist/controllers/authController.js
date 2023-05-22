"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
var jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY);
const loginUser = (req, res) => {
    var token = jwt.sign(req.body, privateKey);
    res.send(token);
};
exports.loginUser = loginUser;
