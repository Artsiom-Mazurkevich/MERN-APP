import * as express from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {postController} from "../controllers/postController";


const router = express.Router()

router.post('/post', authMiddleware, postController.createPost)
router.delete('/post/:id', authMiddleware, postController.deletePost)



export {router as postRouter}
