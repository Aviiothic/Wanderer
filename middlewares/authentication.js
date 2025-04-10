/*
Because the req object is extended by Passport during middleware setup, 
any route or middleware (like your isLoggedIn) has access 
to req.isAuthenticated() and req.user — no need to import Passport again.
*/

import passport from "passport"; //needed due to passport.authenticate 
import Listing from "../models/listing-model.js";
import Review from "../models/review-model.js";


//used to check username and password to authenticate user
const authenticateUser = passport.authenticate("local", {
  failureRedirect: "/listings/login",
  failureFlash: true,
});

//------------------------------------------------------------------
//used to check whether the user is logged in, saves the original url if not logged in
// const isLoggedIn = (req,res,next)=>{
//     //console.log(req.user);  //used to print details of user
//     if(!req.isAuthenticated()){
//         req.session.redirectUrl = req.originalUrl;
//         //ye us path ko store kr rha hum jispe originally jana chah rhe the
//         //but login nahi hone ki wajah se na ja paye
//         /*
//         the issue is that once the passport authenticates the user and lets us
//         login it resets req.session, hence req.session.redirectUrl becomes 
//         undefined, to deal with this we must save it in req.locals because 
//         that is not resetted 
//         */
//         req.flash("error", "you must be signed in");
//         return res.redirect("/listings/login")
//     }
//     next();
// }
//upar wale ko use isliye use nahi kr rha kyuki ab jab hum global\
//middleware use kr rhe original url ko store krne ko to yahan dubara
//store krna redundant hai, comment kr de rhe ki bad me dekh ke seekh sake

/*
⚠️ res.locals ≠ req.session

🔄 res.locals:
Temporary.
Exists only for the current request.
Gets lost after redirects.

📦 req.session:
Persistent.
Stored across requests.
Stays even after redirects, until deleted.

Property	  Accessible by	                Lifetime	        View Access	      Middleware Access
req.session	Server (per session)	        Across requests	  ❌ Not directly	  ✅ Yes
res.locals	Server (per request) + View	  Only this request	 ✅ Yes	          ✅ Yes

*/
//---------------------------------------------------------------------

//used to save the original url in res.locals
//aisa kyuki login ke bad passport.js me session reset ho jata hai
const saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


//check whether current user is listing owner or not
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


//check whether current user is review author or not  
const isReviewAuthor = async(req,res,next)=>{
  let {id, reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error", "You are not authorized to do that.");
      return res.redirect(`/listings/${id}`);
  }
  next();
}


// Prevent logged-in users from accessing login/register/etc
const redirectIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    let referer = req.get('Referrer');
    //It gives you the URL of the page the user was on before they 
    //made the current request — basically the "previous page."
    if (
      !referer ||
      referer.includes('/login') ||
      referer.includes('/register') ||
      !referer.startsWith(`${req.protocol}://${req.get('host')}`)
    ) {
      referer = '/listings';
    }
    req.flash('info', 'You are already logged in.');
    return res.redirect(referer);
  }
  next();
};

//check if user is loggedIn or not
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in");
    return res.redirect("/listings/login");
  }
  next();
};

//prevent login if authenticated (blocks calls if send through apis)
const preventLoginIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("error", "You are already logged in.");
    return res.redirect("/listings");
  }
  next();
};


export{
    isLoggedIn,
    authenticateUser,
    saveRedirectUrl,
    isListingOwner,
    isReviewAuthor,
    redirectIfLoggedIn,
    preventLoginIfAuthenticated
}