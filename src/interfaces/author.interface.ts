import { Document, Schema } from "mongoose";
import { IBook } from "./book.interface";

export interface IAuthor extends Document {
  name: string;
  biography: string;
  birthDate?: Date;
  nationality?: string;
  photo?: string;
  books?: Schema.Types.ObjectId[] | IBook[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthorInput {
  name: string;
  biography: string;
  birthDate?: Date;
  nationality?: string;
  photo?: string;
}

export interface IAuthorUpdate {
  name?: string;
  biography?: string;
  birthDate?: Date;
  nationality?: string;
  photo?: string;
}
