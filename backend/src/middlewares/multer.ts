import multer from 'multer';
import { Request } from 'express';

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    // Specify the destination folder where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    // Define the file name for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the Multer instance
const upload = multer({ storage: storage });


export {upload}