//importing only schema and model not the whole mongoose
import { Schema, model } from "mongoose";
import Review from "./review-model.js";


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
      type: String
      /*
      we are not using below code because we are handling this in our controller and hence no need to do this here
      set: (v) => (v.trim() === "" ? defaultImage : v), // Ensures empty strings become the default
      default: defaultImage, // if we don't use above lilne then it will apply only when the image is undefined not empty("")
      */
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
