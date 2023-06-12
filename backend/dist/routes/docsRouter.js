"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsRouter = void 0;
const express = require('express');
const multer = require('multer'); // A popular middleware for hand
const docsController_1 = require("../controllers/docsController");
const docsRouter = express.Router();
exports.docsRouter = docsRouter;
// POST route for file upload
docsRouter.post('/saveDocDetails', docsController_1.saveDocDetails);
docsRouter.get('/getAllDocuments', docsController_1.fetchAllDocuemnts);
docsRouter.delete('/deleteDoc/:id', docsController_1.deleteDocument);
docsRouter.post('/transferDoc', docsController_1.transferDocument);
docsRouter.get('/getDocTransfers', docsController_1.fetchTransferedDocuments);
