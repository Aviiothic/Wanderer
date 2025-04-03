import express from 'express';
import connectMongoDb from './configs/database-connection.js';
import listingRoutes from './routes/listing-routes.js';
import reviewRoutes from './routes/review-routes.js';
import applyCommonMiddlewares from './middlewares/common-middlewares.js';
import AppError from './utils/error-util.js';

const app = express();
applyCommonMiddlewares(app);
const dbUrl = 'mongodb://localhost:27017/wanderer';

//connecting to mongodb database 
connectMongoDb(dbUrl);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/listings', listingRoutes);  // Mount listing routes
app.use('/listings', reviewRoutes);   //mount review routes

//Catch-all 404 handler for unmatched routes
app.all('*', (req, res, next) => {
  next(new AppError(404, 'OOPS! Page not found'));
})

app.use((err,req,res,next)=>{
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = 500;
    message = 'Internal Server Error';
  }
  //res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", {err});
});


export default app;