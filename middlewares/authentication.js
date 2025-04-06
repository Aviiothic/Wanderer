/*
Because the req object is extended by Passport during middleware setup, 
any route or middleware (like your isLoggedIn) has access 
to req.isAuthenticated() and req.user — no need to import Passport again.
*/

import passport from "passport"; //needed due to passport.authenticate 

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


export{
    isLoggedIn,
    authenticateUser,
    saveRedirectUrl
}