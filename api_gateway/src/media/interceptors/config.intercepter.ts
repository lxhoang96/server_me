import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
require('dotenv').config();
const os = require('os');
export const rootDest = os.homedir() + process.env.UPLOAD_LOCATION;

// Multer configuration
const multerConfig = {
  dest: rootDest,
};
const imageTypes = (/\/(jpg | jpeg | png)$/)
const videoTypes = (/\/(mp3|mp4)$/)
// Multer upload options
export const multerOptions = {
  // Enable file size limits
  // limits: {
  //   fileSize: +process.env.MAX_FILE_SIZE,
  // },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (!file.mimetype.match(imageTypes) && !file.mimetype.match(videoTypes)) {
 
      // Reject file
      return cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
    if (file.mimetype.match(imageTypes) && file.size > process.env.MAX_IMAGE_SIZE) {
      return cb(new Error('File image too large'))
    }
    if (file.mimetype.match(videoTypes) && file.size > process.env.MAX_VIDEO_SIZE) {
      return cb(new Error('File video too large'))
    }
    // Allow storage of file
    return cb(null, true);
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const userID = req.headers.id;
      const dateNow = new Date();
      const relativePath = `/${userID}` + `/${dateNow.getFullYear()}`
        + `/${dateNow.getMonth()+1}` + `/${dateNow.getDate()}` + `/${file.mimetype}`;
      const uploadPath = multerConfig.dest + relativePath;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};