import {config} from "dotenv";
import {GridFsStorage} from 'multer-gridfs-storage';
import * as util from 'util';

const multer = require('multer');


config();
const DBURI = process.env.DBURI || '';

const storage = new GridFsStorage({
    url: DBURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-any-name-${file.originalname}`;
        }

        return {
            bucketName: "images",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    }
});


export const upload = multer({storage})

const uploadFiles = multer({ storage }).single("file");
export const uploadFilesMiddleware = util.promisify(uploadFiles);


