const flashMiddleware = (req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("failure");
    next();
  };
  
  export default flashMiddleware;
  