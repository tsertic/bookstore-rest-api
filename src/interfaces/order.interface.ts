import { Document, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { IBook } from "./book.interface";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface IOrderItem {
  book: Schema.Types.ObjectId | IBook;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: Schema.Types.ObjectId | IUser;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    updateTime: string;
    emailAddress?: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderInput {
  user: Schema.Types.ObjectId | string;
  items: {
    book: Schema.Types.ObjectId | string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface IOrderUpdate {
  status?: OrderStatus;
  paymentResult?: {
    id: string;
    status: string;
    updateTime: string;
    emailAddress?: string;
  };
}
