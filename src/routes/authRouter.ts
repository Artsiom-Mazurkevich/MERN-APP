import express from 'express'
import {authController} from "../controllers/authController";
import {check} from 'express-validator';

const router = express.Router()


router.post('/login', authController.login)
router.post('/signup', [
    check('email', 'Invalid email').isEmail().notEmpty(),
    check('password', 'Password must contain at least 5 characters').isLength({min: 5, max: 30})
], authController.registration)
router.get('/users', authController.getUsers)

export {router as authRouter}
