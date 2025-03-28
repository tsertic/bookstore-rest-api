import { Document, Schema } from "mongoose";
import { IAuthor } from "./author.interface";
import { IReview } from "./review.interface";

export interface IBook extends Document {
  title: string;
  description: string;
  author: Schema.Types.ObjectId | IAuthor;
  price: number;
  isbn: string;
  publicationDate: Date;
  publisher: string;
  genre: string[];
  language: string;
  pageCount: number;
  coverImage?: string;
  stock: number;
  reviews?: Schema.Types.ObjectId[] | IReview[];
  averageRating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookInput {
  title: string;
  description: string;
  author: Schema.Types.ObjectId | string;
  price: number;
  isbn: string;
  publicationDate: Date;
  publisher: string;
  genre: string[];
  language: string;
  pageCount: number;
  coverImage?: string;
  stock: number;
}

export interface IBookUpdate {
  title?: string;
  description?: string;
  author?: Schema.Types.ObjectId | string;
  price?: number;
  isbn?: string;
  publicationDate?: Date;
  publisher?: string;
  genre?: string[];
  language?: string;
  pageCount?: number;
  coverImage?: string;
  stock?: number;
}

export interface IBookFilters {
  title?: string;
  author?: Schema.Types.ObjectId | string;
  minPrice?: number;
  maxPrice?: number;
  genre?: string | string[];
  language?: string;
  publisher?: string;
  inStock?: boolean;
}

export interface IBookSortOptions {
  field: string;
  direction: "asc" | "desc";
}
