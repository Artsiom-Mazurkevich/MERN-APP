import mongoose, {model, Model, Schema, Types} from "mongoose";



export interface ImageInterface {

}


const ImageSchema = new Schema({
    name: String,
    desc: String,
    img:
        {
            data: Buffer,
            contentType: String
        }
})
