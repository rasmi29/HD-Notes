//user interface
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  isEmailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IOTPStore {
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
  purpose: 'signup' | 'login';
}


export interface IJWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}