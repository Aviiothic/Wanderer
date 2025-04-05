import AppError from "../utils/error-util.js";

//Catch-all 404 handler for unmatched routes
const notFoundHandler = (req, res, next) => {
  next(new AppError(404, "OOPS! Page not found"));
}

// Error handling middleware
const globalErrorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = 500;
    message = "Internal Server Error";
  }
  //res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { err });
};

export {
    notFoundHandler,
    globalErrorHandler
}