// import * as express from "express";
const express = require('express')
import mongoose, {ConnectOptions} from "mongoose";
import cors = require("cors");
import {authRouter} from "./routes/authRouter";
import {postRouter} from "./routes/postRouter";
import {config} from 'dotenv';

const app = express()
config()
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter)
app.use('/', postRouter)

const DBURI = process.env.DBURI || '';
const PORT  = process.env.PORT

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
            console.log(`Server work on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
