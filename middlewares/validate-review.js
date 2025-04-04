import reviewSchema from "../validators/review-schema.js";
import AppError from "../utils/error-util.js";

const validateReview = (req,res,next)=>{
    let { error } = reviewSchema.validate(req.body, { abortEarly: false });

    if (error) {
        let errMsg = error.details.map(err => err.message).join(', ');
        throw new AppError(400, errMsg);
    }
    next();
}

export default validateReview;