import mongoose, { Schema, Document, Types } from "mongoose";
import type { INote } from "../types/note.js";

export interface INoteDocument extends INote, Document {
  _id: Types.ObjectId;
}

const noteSchema = new Schema<INoteDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Note title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      maxlength: [10000, "Content cannot exceed 10000 characters"],
    },
  },
  { timestamps: true, versionKey: false }
);

noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ userId: 1, title: 1 });

noteSchema.methods.getPublicData = function () {
  return {
    id: this._id.toString(),
    title: this.title,
    content: this.content,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

noteSchema.statics.findByUserId = function (userId: string) {
  return this.find({ userId }).sort({ createdAt: -1 });
};

export const Note = mongoose.model<INoteDocument>("Note", noteSchema);
