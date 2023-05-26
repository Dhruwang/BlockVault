"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsRouter = void 0;
const express = require('express');
const multer = require('multer'); // A popular middleware for hand
const multer_1 = require("../middlewares/multer");
const docsController_1 = require("../controllers/docsController");
const docsRouter = express.Router();
exports.docsRouter = docsRouter;
// POST route for file upload
docsRouter.post('/uploadDocument', multer_1.upload.single('file'), docsController_1.handleUploadDocument);
