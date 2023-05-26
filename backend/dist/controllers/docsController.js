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
exports.handleUploadDocument = void 0;
const ipfs_http_client_1 = require("ipfs-http-client");
const process_1 = __importDefault(require("process"));
const web3_storage_1 = require("web3.storage");
const ipfs = (0, ipfs_http_client_1.create)();
const handleUploadDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const token = process_1.default.env.WEB3_STORAGE_API_TOKEN;
    try {
        if (!token) {
            return console.error('A token is needed. You can create one on https://web3.storage');
        }
        const storage = new web3_storage_1.Web3Storage({ token });
        if (!file) {
            return;
        }
        console.log(file);
        // const files = []
        // files.push(file)
        // const cid = await storage.put(files)
    }
    catch (err) {
        // Handle the error
        console.log(err);
        res.status(500).json({ error: 'An error occurred while uploading the file to IPFS.' });
    }
});
exports.handleUploadDocument = handleUploadDocument;
