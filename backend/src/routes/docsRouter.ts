const express = require('express');
const multer = require('multer'); // A popular middleware for hand
import { upload } from '../middlewares/multer';
import { saveDocDetails,fetchAllDocuemnts,deleteDocument,transferDocument,fetchTransferedDocuments } from "../controllers/docsController";

const docsRouter = express.Router();

// POST route for file upload
docsRouter.post('/saveDocDetails',  saveDocDetails);
docsRouter.get('/getAllDocuments',  fetchAllDocuemnts);
docsRouter.delete('/deleteDoc/:id',  deleteDocument);
docsRouter.post('/transferDoc',  transferDocument);
docsRouter.get('/getDocTransfers',  fetchTransferedDocuments);



export {docsRouter}