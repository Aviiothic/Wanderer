import mongoose from "mongoose";

const validateObjectIds = (...paramNames) => {
  return (req, res, next) => {
    for (const name of paramNames) {
      const value = req.params[name];
      if (!mongoose.Types.ObjectId.isValid(value)) {
        req.flash("error", `Invalid ${name} provided.`);
        return res.redirect('/listings'); // redirect to a default fallback like /listings
      }
    }
    next();
  };
};

/*
How to use : 
validateObjectIds("id", "postId", "commentId"), can pass any number of params
*/

export default validateObjectIds;
