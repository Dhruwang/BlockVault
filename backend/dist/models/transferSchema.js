"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferRecords = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transferSchema = new mongoose_1.default.Schema({
    toAddress: {
        type: String,
        required: true
    },
    fromAddress: {
        type: String,
        required: true
    },
    docId: {
        type: String,
        required: true
    },
});
const transferRecords = mongoose_1.default.model("transferRecords", transferSchema);
exports.transferRecords = transferRecords;
