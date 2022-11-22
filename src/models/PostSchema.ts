import mongoose, {model, Model, Schema, Types} from "mongoose";


export interface IPost {
    _id?: mongoose.Types.ObjectId;
    title: string;
    text: string;
    tags: Types.Array<any>;
    viewsCount: number;
    imageURL?: string;
    author: Types.ObjectId;
}


const IPostSchema = new Schema<IPost> (
    {
        title: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {default: []},
        viewsCount: {
            type: Number,
            default: 0
        },
        author: String,
        imageURL: String

    },
    {collection: "posts", timestamps: true}
);

export const Post: Model<IPost> = model("Post", IPostSchema);
