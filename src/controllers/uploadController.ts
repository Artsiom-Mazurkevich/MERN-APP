import {Request, Response} from 'express';
import {uploadFilesMiddleware} from '../middleware/upload';
import mongoose from 'mongoose';



class UploadController_ {
    async uploadFiles (req: Request, res: Response) {
        try {
            await uploadFilesMiddleware(req, res);
            console.log(req.file);

            if (req.file == undefined) {
                return res.send({
                    message: "You must select a file.",
                });
            }

            return res.send({
                message: "File has been uploaded.",
            });
        } catch (error) {
            console.log(error);

            return res.send({
                message: "Error when trying upload image: ${error}",
            });
        }
    }
    async getListFiles (req: Request, res: Response) {
        try {
            const {db} = mongoose.connection
            const images = db.collection("images" + ".files");

            const cursor = images.find({});

            if ((await cursor.count()) === 0) {
                return res.status(500).send({
                    message: "No files found!",
                });
            }

            const fileInfos: any = [];
            await cursor.forEach((doc) => {
                fileInfos.push({
                    name: doc.filename,
                    url: '<--DBURL-->: ' + doc.filename,
                });
            });

            return res.status(200).send(fileInfos);
        } catch (error: any) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }
    async download (req: Request, res: Response) {
        try {
            const {db} = mongoose.connection
            const bucket = new mongoose.mongo.GridFSBucket(db, {
                bucketName: 'images',
            });

            let downloadStream = bucket.openDownloadStreamByName(req.params.name);

            downloadStream.on("data", function (data) {
                return res.status(200).write(data);
            });

            downloadStream.on("error", function (err) {
                return res.status(404).send({ message: "Cannot download the Image!" });
            });

            downloadStream.on("end", () => {
                return res.end();
            });
        } catch (error: any) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }
}


export const uploadController = new UploadController_()
