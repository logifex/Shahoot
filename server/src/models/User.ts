import IUser from "../types/user";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 30,
    match: /^[a-zA-Z0-9-_]+$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  verified: { type: Boolean, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
