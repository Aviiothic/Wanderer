//importing only schema and model not the whole mongoose
import { Schema, model } from "mongoose";
import Review from "./review-model.js";

const defaultImage =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [5, "Title should not be less than 5 chars"],
      maxLength: [60, "Title should not be more than 60 chars"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [10, "Description should not be less than 10 chars"],
      maxLength: [120, "Description should not be more than 120 chars"],
    },
    image: {
      type: String,
      default: defaultImage, // ✅ Default image is set here
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Listing = model("Listing", listingSchema);

export default Listing;
