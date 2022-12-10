import {Response, Request} from "express";
const express = require('express')
import mongoose, {ConnectOptions} from "mongoose";
import cors = require("cors");
import {authRouter} from "./routes/authRouter";
import {postRouter} from "./routes/postRouter";
import {uploadRouter} from "./routes/uploadRouter";
import * as path from 'path';
import {config} from 'dotenv';

const app = express()
config()
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, '/../dist/views/uploadTest.html')))
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter)
app.use('/home', (req: Request, res: Response) => {
    return res.sendFile(path.join(`${__dirname}/views/uploadTest.html`));
})
app.use('/', postRouter)
app.use('/', uploadRouter)

const DBURI = process.env.DBURI || '';
const PORT  = process.env.PORT || 5000;

const start = async () => {
    try {
        await mongoose.connect(DBURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions,
            (error) => {
                return error ? console.log(error) : console.log('Connected to MongoDB successful')
            });
        app.listen(PORT, () => {
            console.log(`Server work on port: ${PORT} `);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
