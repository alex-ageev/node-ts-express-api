import mongoose from "mongoose";

/*
Iremos guardar aqui o USER, ADMIN, MODERATOR, MANAGER...
por defeito role será USER.
*/
const RoleSchema = new mongoose.Schema({
  value: { type: String, required: true, default: "USER" },
});

export interface RoleType extends mongoose.Document {
  value: string;
}

export const Role = mongoose.model<RoleType>("Role", RoleSchema);
