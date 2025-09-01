import type { Types } from "mongoose";

export interface INote {
  userId: Types.ObjectId;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}