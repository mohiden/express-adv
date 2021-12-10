import mongoose from "mongoose";
import { IUser } from ".";

export interface ISession extends mongoose.Document {
  user: IUser["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<ISession>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

export const Session = mongoose.model<ISession>("Session", sessionSchema);
