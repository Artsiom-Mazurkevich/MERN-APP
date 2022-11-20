import {NextFunction,Request, Response} from "express";
import {Secret, verify} from 'jsonwebtoken';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        // check if auth header exists
        if (req.headers.authorization) {
            // parse token from header
            const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
            if (token) {
                const payload = verify(token, process.env.JWTSECRET as Secret);
                if (payload) {
                    // store user data in request object
                    // @ts-ignore
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: "token verification failed" });
                }
            } else {
                res.status(400).json({ error: "Malformed auth header" });
            }
        } else {
            res.status(400).json({ error: "No authorization header" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}
