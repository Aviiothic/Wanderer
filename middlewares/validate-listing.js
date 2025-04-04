import listingSchema from "../validators/listing-schema.js";
import AppError from "../utils/error-util.js";

//middlewares to validate data coming form user side
const validateListing = (req, res, next) => {
    const listingData = req.body.listing || req.body; // Handle both cases

    let { error } = listingSchema.validate(listingData, { abortEarly: false });

    if (error) {
        let errMsg = error.details.map(err => err.message).join(', ');
        throw new AppError(400, errMsg);
    }
    next();
};
/*
Kuchh gyan ki baate
    const listingData = req.body.listing || req.body; // Handle both cases
    upar aisa likha hu kyuki jab hum form data post se send krte hai to data
    object ke andar nested hoke ja skta hai (is case me ja rha) lekin jab
    method-override use krke jab put se bhejte hain tab data seedha plaintext 
    ke form me jata hai, isliye yahan listing object nahi mil payega aur hame
    data req.body se lena pdega
*/


export default validateListing;

