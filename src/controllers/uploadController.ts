import {Request, Response} from 'express';
import {uploadFilesMiddleware} from '../middleware/upload';
import mongoose from 'mongoose';
import {User} from "../models/User";
import {log} from "util";
import {Post} from "../models/PostSchema";


class UploadController_ {
    async uploadFiles(req: Request, res: Response) {
        try {
            if (req.file === undefined) {
                return res.send({
                    message: "You must select a file.",
                });
            }
            // @ts-ignore
            const id = req.file.id
            if (id) {
                // @ts-ignore
                await Post.findOneAndUpdate({author: req.user.id}, {imageURL: id}, {}, (err, doc) => {
                    if (err) console.log(err)
                    else res.json({message: 'Image upload success', updatedUser: doc})
                })
            }
        } catch (e) {
            console.log(e)
        }
        // try {
        //     const fileInfo = await uploadFilesMiddleware(req, res).then((res: any) => console.log(res))
        //
        //
        //
        //     if (req.file === undefined) {
        //         return res.send({
        //             message: "You must select a file.",
        //         });
        //     }
        //
        //     return res.send({
        //         message: "File has been uploaded.",
        //     });
        // } catch (error) {
        //     console.log(error);
        //
        //     return res.send({
        //         message: `Error when trying upload image: ${error}`,
        //     });
        // }
    }

    async getListFiles(req: Request, res: Response) {
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

    async download(req: Request, res: Response) {
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
                return res.status(404).send({message: "Cannot download the Image!"});
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
