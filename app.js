import express from 'express';
import connectMongoDb from './configs/database-connection.js';
import listingRoutes from './routes/listing-routes.js';
import reviewRoutes from './routes/review-routes.js';
import applyCommonMiddlewares from './middlewares/common-middlewares.js';
import { notFoundHandler, globalErrorHandler } from './middlewares/error-handler.js';


const app = express();
applyCommonMiddlewares(app);

const dbUrl = 'mongodb://localhost:27017/wanderer';

//connecting to mongodb database 
connectMongoDb(dbUrl);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.path}`);
//   next();
// });
//above code is used to log all requests coming on the site on the terminal
//quite helpful in debugging


app.use('/listings', listingRoutes);  // Mount listing routes
app.use('/listings/:id/reviews', reviewRoutes); //mounting review routes
app.all('*', notFoundHandler);
app.use(globalErrorHandler);


export default app;