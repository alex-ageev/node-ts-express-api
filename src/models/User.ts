import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: "Role" }], // cada role do user irá apontar para schema de Role
  }
);

export interface UserType extends mongoose.Document {
  username: string;
  password: string;
  roles: string[];
}

export const User = mongoose.model<UserType>("User", UserSchema);
