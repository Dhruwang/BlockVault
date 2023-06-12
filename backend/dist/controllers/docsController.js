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
exports.fetchTransferedDocuments = exports.transferDocument = exports.deleteDocument = exports.fetchAllDocuemnts = exports.saveDocDetails = void 0;
const express_1 = require("express");
const documentSchema_1 = require("../models/documentSchema");
const userSchema_1 = require("../models/userSchema");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const transferSchema_1 = require("../models/transferSchema");
var jwt = require('jsonwebtoken');
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const privateKey = process.env.PRIVATE_KEY;
const saveDocDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, docName, docType, docSize, link } = req.body;
        const address = jwt.verify(token, privateKey).address;
        const doc = new documentSchema_1.document({
            address, docName, docType, docSize, link
        });
        try {
            const res = yield doc.save();
            res.send(doc);
        }
        catch (err) {
            res.send(err);
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.saveDocDetails = saveDocDetails;
const fetchAllDocuemnts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        const address = jwt.verify(token, privateKey).address;
        const docs = yield documentSchema_1.document.find({ address });
        res.send(docs).status(200);
    }
    catch (error) {
        res.send("Internal Server Error").status(500);
    }
});
exports.fetchAllDocuemnts = fetchAllDocuemnts;
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentID = req.params.id;
        yield documentSchema_1.document.deleteOne({ _id: documentID }); // Assuming "Document" is the mongoose model representing your document
        res.status(200).send("Document deleted");
    }
    catch (err) {
        res.status(500).send(err === null || err === void 0 ? void 0 : err.message);
    }
});
exports.deleteDocument = deleteDocument;
const transferDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fromAddress, toAddress, docId } = req.body;
        // adding to db of user to which document is sent
        let documentToTransfer = {};
        try {
            documentToTransfer = yield documentSchema_1.document.findOne({ _id: docId });
        }
        catch (error) {
            express_1.response.send(error);
        }
        const newTransferRecord = new transferSchema_1.transferRecords({
            fromAddress, toAddress, docId
        });
        const transferRecordCreated = yield newTransferRecord.save();
        if (transferRecordCreated) {
            // adding transfer record id to from User 
            const fromUser = yield userSchema_1.User.findOne({ address: fromAddress });
            if (!fromUser) {
                res.json({ "error": "User not found" });
                return;
            }
            fromUser.transfers.push(transferRecordCreated._id);
            fromUser.save();
            // similarly adding to transfer records of to User 
            const toUser = yield userSchema_1.User.findOne({ address: toAddress });
            if (!toUser) {
                res.json({ "error": "User not found" });
                return;
            }
            toUser.transfers.push(transferRecordCreated._id);
            toUser.save();
        }
        res.send("document transfered successfully").status(200);
    }
    catch (error) {
        res.send(error);
    }
});
exports.transferDocument = transferDocument;
const fetchTransferedDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const userAddress = jwt.verify(token, privateKey).address;
        let transferRecordsArray = [];
        let documentArray = [];
        const user = yield userSchema_1.User.findOne({ address: userAddress });
        if (!user) {
            res.status(404).send("user not found");
        }
        if (user.transfers) {
            transferRecordsArray = user.transfers;
        }
        for (const element of transferRecordsArray) {
            try {
                const transRecord = yield transferSchema_1.transferRecords.findById(element);
                if (transRecord) {
                    const doc = yield documentSchema_1.document.findById(transRecord.docId);
                    documentArray.push(doc);
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error finding document in the database" });
                return;
            }
        }
        res.send(documentArray);
    }
    catch (error) {
        res.send(error);
    }
});
exports.fetchTransferedDocuments = fetchTransferedDocuments;
