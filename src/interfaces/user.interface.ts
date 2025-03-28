import { Document } from "mongoose";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  //methods
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

export interface IUserInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}
export interface IAuthTokens {
  token: string;
}
