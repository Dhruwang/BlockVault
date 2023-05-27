const express = require('express');
const multer = require('multer'); // A popular middleware for hand
import { upload } from '../middlewares/multer';
import { saveDocDetails } from "../controllers/docsController";

const docsRouter = express.Router();

// POST route for file upload
docsRouter.post('/saveDocDetails',  saveDocDetails);


export {docsRouter}