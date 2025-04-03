/*we use joi for server side validation
we will create a schema but this would be only for the purpose 
of validating the schema, that is the data coming from the clilent
side
*/
import Joi from "joi";

// Suggested code may be subject to a license. Learn more: ~LicenseLog:1619490636.
const listingSchema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    description: Joi.string().min(10).max(1200).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().allow("", null)
});

//upar wale code me check kr rhe ki listing ek object hona chahiye aur wo required hai
//similarly listing ke andar ke properties ko wo check kr rha ke object ka data vlaid hai ya nahi

export default listingSchema;