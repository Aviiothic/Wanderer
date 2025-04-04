/*we use joi for server side validation
we will create a schema but this would be only for the purpose 
of validating the schema, that is the data coming from the clilent
side
*/
import Joi from "joi";

// const listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().min(5).max(30).required(),
//     description: Joi.string().min(10).max(1200).required(),
//     location: Joi.string().required(),
//     country: Joi.string().required(),
//     price: Joi.number().min(0).required(),
//     image: Joi.string().allow("", null),
//   }).required(),
// });

//upar wale code me check kr rhe ki listing ek object hona chahiye aur wo required hai
//similarly listing ke andar ke properties ko wo check kr rha ke object ka data vlaid hai ya nahi
/*
upar walw schema ko isliye use nahi kr rhe kyuki validate listing middleware me hum
const listingData = req.body.listing || req.body; // Handle both cases
    let { error } = listingSchema.validate(listingData, { abortEarly: false });

    pehle hi listing ko extract kr le rhe, aur phir agar hum upar wala schema use krenge 
    to ye listing object mangege aur uske ander properties dekhega

    ab man lete hai ki aisa dikkat hai to hum apna validate listing middleware ke code ko change kr dete hai
    let { error } = listingSchema.validate(req.body, { abortEarly: false });

    lekin aise krne se dikkat kya hai ki jab hum method override use krenge tab data plain text me aayega object me nahi
    aur tab hum req.body se listing object dhundh na payenge ayr validation fail ho jayega

    in sab dikkat se bachne ke liye kya krte hai ki validation schema ki kuchh aise
    design kr dete hai ki ye plain text (,atlab ki individual items ko validate kre)
    isse apna dono kam ho jayega, jab get aur post use hoga tab data req.body.listing me aa jayega
    jab override hoga tab req.body me aa jayega aur same validator dono pe kam krega
*/

const listingSchema = Joi.object({
  title: Joi.string().min(5).max(30).required(),
  description: Joi.string().min(10).max(1200).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().allow("", null),
});

export default listingSchema;
