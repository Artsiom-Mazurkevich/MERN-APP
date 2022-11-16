import express from "express";
import mongoose, {ConnectOptions} from "mongoose";
import {authRouter} from "./routes/authRouter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter)

const DBURI = process.env.DBURI || "";

const start = async () => {
    try {
        await mongoose.connect(DBURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            } as ConnectOptions,
            () => {
                console.log("Connected to MongoDB successful");
            });
        app.listen(8000, () => {
            console.log("Server work on port 8000");
        });
    } catch (e) {
        console.log(e);
    }
};

start();
