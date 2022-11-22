import * as express from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {postController} from "../controllers/postController";


const router = express.Router()

router.post('/post', postController.createPost)



export {router as postRouter}
