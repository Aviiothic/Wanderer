import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Import required for __dirname equivalent
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '..', 'public');

function applyCommonMiddlewares(app) {
    app.set('view engine', 'ejs');  // Enable server-side rendering with EJS
    app.set('views', path.join(__dirname, '..', 'views'));  // Set path for view files
    app.use(express.json());  // Parse JSON data in request body
    app.use(express.urlencoded({ extended: true })); // Parse form data in req.body (POST)
    app.use(methodOverride('_method')); // Enable PATCH, PUT, DELETE via HTTP requests
    app.use(express.static(path.join(__dirname, '..', 'public')));  // Serve static files correctly
    app.engine('ejs', ejsMate);  // Use EJS as the view engine for layouts or partials
    app.use(express.static(publicPath)); 

}

export default applyCommonMiddlewares;