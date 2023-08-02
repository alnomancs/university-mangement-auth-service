import { Schema, model } from "mongoose";
import { ILoginUser } from "./auth.interface";

const authSchema = new Schema<ILoginUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Auth = model<ILoginUser>("Admin", authSchema);
