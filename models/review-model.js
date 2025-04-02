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
    }
});

const Review = model("Review", reviewSchema)
export default Review;