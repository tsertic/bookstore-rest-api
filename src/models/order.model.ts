import mongoose, { Schema } from "mongoose";
import { IOrder, OrderStatus } from "../interfaces/order.interface";

const OrderItemSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be less than 1"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
});

const OrderSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: [true, "Please add total amount"],
      min: [0, "Total amount cannot be negative"],
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    paymentMethod: {
      type: String,
      required: [true, "Please add payment method"],
    },
    paymentResult: {
      id: String,
      status: String,
      updateTime: String,
      emailAddress: String,
    },
    shippingAddress: {
      address: {
        type: String,
        required: [true, "Please add shipping address"],
      },
      city: {
        type: String,
        required: [true, "Please add city"],
      },
      postalCode: {
        type: String,
        required: [true, "Please add postal code"],
      },
      country: {
        type: String,
        required: [true, "Please add country"],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Populate user information and book details
OrderSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.populate({
    path: "user",
    select: "name email",
  }).populate({
    path: "items.book",
    select: "title author",
    populate: {
      path: "author",
      select: "name",
    },
  });
  next();
});

export default mongoose.model<IOrder>("Order", OrderSchema);
