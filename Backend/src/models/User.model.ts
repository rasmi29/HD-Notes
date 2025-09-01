import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/auth.js";

export interface IUserDocument extends IUser, Document {
  _id: string;
}

const userSchema: Schema<IUserDocument> = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(date: Date) {
        // User must be at least 9 years old
        const today = new Date();
        const minAge = new Date(today.getFullYear() - 9, today.getMonth(), today.getDate());
        return date <= minAge;
      },
      message: 'User must be at least 9 years old'
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, 
  versionKey: false 
});


userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    dateOfBirth: this.dateOfBirth,
    isEmailVerified: this.isEmailVerified,
    createdAt: this.createdAt
  };
};

 //find user by email
 userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

export const User = mongoose.model<IUserDocument>('User', userSchema);

export default User
