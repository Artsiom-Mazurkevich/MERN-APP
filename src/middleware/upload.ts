import {config} from "dotenv";
const multer = require('multer');
import {GridFsStorage} from 'multer-gridfs-storage';
import * as util from 'util';


config();
const DBURI = process.env.DBURI || '';

const storage = new GridFsStorage({
    url: DBURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        console.log(file.mimetype)
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return null
            //return fileName
            // return `${new Date()}-img-${file.originalname}`;
        }

        return {
            bucketName: "images",
            filename: `${new Date()}-img-${file.originalname}`
        };
    }
});

const uploadFiles = multer({ storage }).single("file");
export const uploadFilesMiddleware = util.promisify(uploadFiles);


