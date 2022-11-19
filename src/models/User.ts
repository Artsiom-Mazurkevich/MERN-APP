import mongoose, {model, Model, Schema} from "mongoose";

export interface IUser {
    _id?: mongoose.Types.ObjectId
    email: string;
    password: string;
}

const IUserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {collection: "users"}
);

export const User: Model<IUser> = model("User", IUserSchema);
