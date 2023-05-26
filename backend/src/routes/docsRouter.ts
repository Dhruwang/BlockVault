const express = require('express');
const multer = require('multer'); // A popular middleware for hand
import { upload } from '../middlewares/multer';
import { handleUploadDocument } from "../controllers/docsController";

const docsRouter = express.Router();

// POST route for file upload
docsRouter.post('/uploadDocument', upload.single('file'), handleUploadDocument);


export {docsRouter}