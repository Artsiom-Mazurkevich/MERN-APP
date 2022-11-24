import {Request, Response} from "express";
import {User} from '../models/User';
import {hashSync, compareSync} from 'bcrypt';
import {Secret, sign} from 'jsonwebtoken';
import {validationResult} from 'express-validator';


class authController_ {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Signup error", errors: errors["errors"]})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "User with this email already exists"})
            }
            const hashPassword = hashSync(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
            return res.json({message: 'User inserted successfully'})
        }
        catch (e: any) {
            console.log(e)
            res.status(400).json({message: "Signup error"})
        }
    }
    async login(req: Request, res: Response) {
        try {
            // check if the user exists
            const {email, password} = req.body
            const user = await User.findOne({ email });
            if (user) {
                //check if password matches
                const result = compareSync(password, user.password);
                if (result) {
                    // sign token and send it in response
                    const token = sign({ email, id: user._id }, process.env.JWTSECRET as Secret, {expiresIn: '1h'});
                    res.json({ token });
                } else {
                    res.status(400).json({ error: "password doesn't match" });
                }
            } else {
                res.status(400).json({ error: "User doesn't exist" });
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    async getUsers(req: Request, res: Response) {
        try {
            res.json({message: 'ALL WORK'})
        }
        catch (e) {

        }
    }
}

export const authController = new authController_()





