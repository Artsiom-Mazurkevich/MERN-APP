import * as express from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {uploadController} from "../controllers/uploadController";


const router = express.Router()

router.post("/upload", uploadController.uploadFiles);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);



export {router as uploadRouter}
