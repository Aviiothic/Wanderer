/*
Because the req object is extended by Passport during middleware setup, 
any route or middleware (like your isLoggedIn) has access 
to req.isAuthenticated() and req.user — no need to import Passport again.
*/

import passport from "passport"; //needed due to passport.authenticate 
import Listing from "../models/listing-model.js";
import Review from "../models/review-model.js";


const authenticateUser = passport.authenticate("local", {
  failureRedirect: "/listings/login",
  failureFlash: true,
});



const isLoggedIn = (req,res,next)=>{
    //console.log(req.user);  //used to print details of user
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        //ye us path ko store kr rha hum jispe originally jana chah rhe the
        //but login nahi hone ki wajah se na ja paye
/*
the issue is that once the passport authenticates the user and lets us
login it resets req.session, hence req.session.redirectUrl becomes 
undefined, to deal with this we must seve it in req.locals because 
that is not resetted 
*/
        req.flash("error", "you must be signed in");
        return res.redirect("/listings/login")
    }
    next();
}

const saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

const isListingOwner = async (req, res, next) => {
    const { id } = req.params;
   
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
  /* 
    below we are directly comparing owner with currUser.id not owner.id with currUser.id
    this is because Mongoose automatically casts certain fields to ObjectId when needed. 
    If you did not populate the owner, currListing.owner is just an ObjectId, not the full user object.
    If you did populate the owner using .populate('owner'), then currListing.owner becomes a full user document. 
    And in that case we will have to compare the ids of the two objects.
    
  */
    if (!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not authorized to do that.");
      return res.redirect(`/listings/${id}`);
    }
  
    // Attach listing to request if needed later
    req.listing = listing;
    /*isse fayda ye hai ki aage wale controller aur middleware me hmko lilsting dhundhne
    ka jarurat nhi hai. isse hamara number of database queries reduce hoga aur website fast bnega
    ek hi cheez ke liye bar bar query krne se accha hai is use req ya res me attach kr do, aur aage use krlo
    */
    next();
  };

const isReviewAuthor = async(req,res,next)=>{
  let {id, reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "You are not authorized to do that.");
    //return res.redirect(`/listings/${id}`);
  }
  next();
}


export{
    isLoggedIn,
    authenticateUser,
    saveRedirectUrl,
    isListingOwner,
    isReviewAuthor
}