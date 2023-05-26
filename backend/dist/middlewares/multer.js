"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// Set up Multer storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination folder where uploaded files will be stored
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define the file name for the uploaded file
        cb(null, Date.now() + '-' + file.originalname);
    }
});
// Create the Multer instance
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;
