import mongoose, { Model, Schema, Types } from "mongoose";
import { IReview } from "../interfaces/review.interface";
import { IBook } from "../interfaces/book.interface";

const ReviewSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Please provide a book"],
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      required: [true, "Please add a comment"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per book
ReviewSchema.index({ book: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
ReviewSchema.statics.calculateAverageRating = async function (
  bookId: Types.ObjectId
) {
  const stats = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: "$book",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    if (stats.length > 0) {
      // @ts-ignore
      await this.model("Book").findByIdAndUpdate(bookId, {
        averageRating: stats[0].averageRating.toFixed(1),
      });
    } else {
      // @ts-ignore
      await this.model("Book").findByIdAndUpdate(bookId, {
        averageRating: 0,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call calculateAverageRating after save
ReviewSchema.post("save", async function () {
  // @ts-ignore: Unreachable code error
  await this.constructor.calculateAverageRating(this.book);
});

// Call calculateAverageRating after remove
// @ts-ignore
ReviewSchema.post("remove", async function () {
  // @ts-ignore: Unreachable code error
  await this.constructor.calculateAverageRating(this.book);
});

// Populate user name and book title
ReviewSchema.pre(/^find/, function (next) {
  // @ts-ignore
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

export default mongoose.model<IReview>("Review", ReviewSchema);
