import mongoose, { Schema, Document } from 'mongoose';
import type { IOTPStore } from '../types/auth.js';

export interface IOTPDocument extends IOTPStore, Document {}

const OTPSchema: Schema<IOTPDocument> = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true,
    length: 6
  },
  purpose: {
    type: String,
    required: true,
    enum: ['signup', 'login']
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 5 minutes expiration
  }
},{
    timestamps:true
});

// index for automatic cleanup of expired OTPs
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
OTPSchema.index({ email: 1, purpose: 1 });

export const OTPStore = mongoose.model<IOTPDocument>('OTPStore', OTPSchema);