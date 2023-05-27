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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllDocuemnts = exports.saveDocDetails = void 0;
const documentSchema_1 = require("../models/documentSchema");
const saveDocDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, docName, docType, docSize, link } = req.body;
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
        const address = req.query.address;
        const doc = yield documentSchema_1.document.find({ address });
        res.send(doc).status(200);
    }
    catch (error) {
        res.send("Internal Server Error").status(500);
    }
});
exports.fetchAllDocuemnts = fetchAllDocuemnts;
