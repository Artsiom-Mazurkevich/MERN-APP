import mongoose, {model, Model, Schema, Types} from "mongoose";


export interface IPost {
    _id?: mongoose.Types.ObjectId;
    title: string;
    text: string;
    tags: Schema.Types.Array;
    viewsCount: number;
    imageURL?: string;
    author: Schema.Types.ObjectId;
}


const PostSchema = new Schema<IPost> (
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
        tags: {
            type: Schema.Types.Array,
            default: [],
            required: true
        },
        viewsCount: {
            type: Number,
            default: 0
        },
        author: {
            type: Types.ObjectId,
            required: true
        },
        imageURL: {
            type: Schema.Types.ObjectId,
            required: false,
            default: null
        }

    },
    {collection: "posts", timestamps: true}
);

export const Post: Model<IPost> = model("Post", PostSchema);
