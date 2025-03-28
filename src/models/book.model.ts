import mongoose, { Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a book title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Please add an author"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price must be greater than 0"],
    },
    isbn: {
      type: String,
      required: [true, "Please add an ISBN"],
      unique: true,
      match: [/^(?:\d[\ |-]?){13}$/, "Please add a valid 13-digit ISBN"],
    },
    publicationDate: {
      type: Date,
      required: [true, "Please add a publication date"],
    },
    publisher: {
      type: String,
      required: [true, "Please add a publisher"],
    },
    genre: {
      type: [String],
      required: [true, "Please add at least one genre"],
      enum: [
        "Fiction",
        "Non-fiction",
        "Fantasy",
        "Science Fiction",
        "Mystery",
        "Thriller",
        "Romance",
        "Biography",
        "History",
        "Self-help",
        "Business",
        "Children",
        "Young Adult",
        "Horror",
        "Poetry",
        "Comics",
        "Drama",
        "Other",
      ],
    },
    language: {
      type: String,
      required: [true, "Please add a language"],
      default: "English",
    },
    pageCount: {
      type: Number,
      required: [true, "Please add a page count"],
      min: [1, "Page count must be at least 1"],
    },
    coverImage: {
      type: String,
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      min: [0, "Stock cannot be negative"],
    },
    averageRating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate with virtuals
BookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book",
  justOne: false,
});

// Middleware to populate author and reviews
BookSchema.pre(/^find/, function (next) {
  // @ts-ignore
  this.populate({
    path: "author",
    select: "name",
  });
  next();
});

export default mongoose.model<IBook>("Book", BookSchema);
