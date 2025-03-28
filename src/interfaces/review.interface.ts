import { Document, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { IBook } from "./book.interface";

export interface IReview extends Document {
  user: Schema.Types.ObjectId | IUser;
  book: Schema.Types.ObjectId | IBook;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewInput {
  user: Schema.Types.ObjectId | string;
  book: Schema.Types.ObjectId | string;
  rating: number;
  comment: string;
}

export interface IReviewUpdate {
  rating?: number;
  comment?: string;
}
