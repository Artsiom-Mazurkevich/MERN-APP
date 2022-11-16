import { model, Model, Schema } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  password: string;
}

const IUserSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should be minimum of 8 characters"],
    },
  },
  { collection: "user", timestamps: true }
);

export const UserModel: Model<IUser> = model("user", IUserSchema);
