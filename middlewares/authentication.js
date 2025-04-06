
const isLoggedIn = (req,res,next)=>{
    console.log(req.user);  //used to print details of user
    if(!req.isAuthenticated()){
        req.flash("error", "you must be signed in");
        return res.redirect("/listings/login")
    }
    next();
}

export{
    isLoggedIn
}