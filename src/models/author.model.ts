import mongoose, { Schema } from "mongoose";
import { IAuthor } from "../interfaces/author.interface";

const AuthorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add an author name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    biography: {
      type: String,
      required: [true, "Please add a biography"],
    },
    birthDate: {
      type: Date,
    },
    nationality: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate with virtuals
AuthorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

export default mongoose.model<IAuthor>("Author", AuthorSchema);
