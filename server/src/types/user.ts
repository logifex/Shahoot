import { Types } from "mongoose";

export interface IUserDetails {
  _id: Types.ObjectId;
  email: string;
  username: string;
  verified: boolean;
}

interface IUser extends IUserDetails {
  password: string;
}

export default IUser;
