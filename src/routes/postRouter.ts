import * as express from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {postController} from "../controllers/postController";


const router = express.Router()

router.post('/post', authMiddleware, postController.createPost)
router.delete('/post/:id', authMiddleware, postController.deletePost)
router.patch('/post/:id', authMiddleware, postController.updatePost)
router.get('/post/:id', postController.getOnePost)
router.get('/post', postController.getAllPosts)



export {router as postRouter}
