import listingSchema from "../schema.js";
import AppError from "../utils/error-util.js";

//middlewares to validate data coming form user side
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body.listing, { abortEarly: false });

    if (error) {
        let errMsg = error.details.map(err => err.message).join(', ');
        return res.status(400).json({ success: false, message: errMsg });
    }
    next();
};


export default validateListing;

