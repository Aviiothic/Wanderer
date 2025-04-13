import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Import required for __dirname equivalent
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'express-flash';
import flashMiddleware from './flash-middleware.js';
import './passport-config.js';  // configures the singleton instance, runs the file instead of importing in one variable
import passport from 'passport';
/*
“It may be that we are importing passport for the first time in 
common-middlewares.js, but before this we have already imported 
passport inside configure-passport.js. So after configuration, 
if we import passport anywhere else, we get the same configured 
passport, because it’s singleton in property.”
*/


// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '..', 'public');

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    collectionName: 'sessions',
    touchAfter: 24 * 60 * 60,

})

store.on("error", ()=>{
    console.log("Error in Mongo Session Store");
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}



function applyCommonMiddlewares(app) {
    app.set('view engine', 'ejs');  // Enable server-side rendering with EJS
    app.set('views', path.join(__dirname, '..', 'views'));  // Set path for view files
    app.use(express.urlencoded({ extended: true })); // Parse form data in req.body (POST)
    app.use(express.json());  // Parse JSON data in request body
    app.use(methodOverride('_method')); // Enable PATCH, PUT, DELETE via HTTP requests
    app.use(express.static(path.join(__dirname, '..', 'public')));  // Serve static files correctly
    app.engine('ejs', ejsMate);  // Use EJS as the view engine for layouts or partials
    // app.use(express.static(publicPath)); //to use static files like css and js
    app.use(session(sessionOptions));   //to use sessions on server side
    app.use(passport.initialize());
    app.use(passport.session());//sets req.user hence above flash and flash middleware will work
    app.use(flash()); //to show flash messages
    app.use(flashMiddleware);
    
}

export default applyCommonMiddlewares;