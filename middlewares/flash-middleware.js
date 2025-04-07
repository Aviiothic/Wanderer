//res.locals is a special object provided by Express to store data 
//that you want to access in the current request–response cycle.
//It's used a lot for sharing data between middleware and routes or templates.

const flashMiddleware = (req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
  };
  
  export default flashMiddleware;
  