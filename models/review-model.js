import{Schema, model } from "mongoose"; 

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: [true, "Comment is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating should not be less than 1"],
        max: [5, "Rating should not be more than 5"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const Review = model("Review", reviewSchema)
export default Review;

/*
ref: "User" is a string reference to the model name.
You don’t need to import the User model in this file — Mongoose takes 
care of linking during .populate(), assuming the model has already 
been registered somewhere else in the project.
*/