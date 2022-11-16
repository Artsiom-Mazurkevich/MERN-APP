import express from 'express'
import {authController} from "../controllers/authController";

const router = express.Router()


router.post('/login')
router.post('/registration')
router.get('/users', authController.getUsers)

export {router as authRouter}
