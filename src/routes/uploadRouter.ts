import * as express from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {uploadController} from "../controllers/uploadController";
import {upload} from "../middleware/upload";


const router = express.Router()

router.post("/upload", authMiddleware, upload.single('file'), uploadController.uploadFiles);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);



export {router as uploadRouter}
