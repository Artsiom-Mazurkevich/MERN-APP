import express from "express";
import mongoose, {ConnectOptions} from "mongoose";
import cors from "cors"
import {authRouter} from "./routes/authRouter";
import dotenv from 'dotenv';

const app = express();
dotenv.config()
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter)

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
