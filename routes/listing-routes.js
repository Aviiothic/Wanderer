import { Router } from "express";
import {
  showAllListings,
  showSingleListing,
  addListingForm,
  addListing,
  editListingForm,
  updateListing,
  deleteListing,
  addUserForm,
  addUser,
  loginPage,
  loginUser,
  logoutUser
} from '../controllers/listing-controllers.js';


import validateListing from "../middlewares/validate-listing.js";
import validateObjectIds from "../middlewares/validate-objectIds.js";
import multer from "multer";
import { storage } from "../configs/cloud-config.js";

import { 
    isLoggedIn, 
    authenticateUser, 
    saveRedirectUrl, 
    isListingOwner,
    redirectIfLoggedIn,
    preventLoginIfAuthenticated
  } from "../middlewares/authentication.js";

import getCoordinates from "../middlewares/get-coordinates.js";

const upload = multer({ storage })
const router = Router();

// route to Get all listings
router.get(
  '/', 
  showAllListings); 

// route to show SignUp User Form
router.get(
  '/signup',
  redirectIfLoggedIn, 
  addUserForm);

// route to signup user
router.post(
  '/signUp',
  preventLoginIfAuthenticated,
  saveRedirectUrl,
  addUser);

// route to  Show form to add a new listing
router.get(
  '/new', 
  isLoggedIn, 
  addListingForm); 

// route to show login page
router.get(
  '/login',
  redirectIfLoggedIn,
  loginPage); 

// route to logout user
router.get(
  '/logout', 
  isLoggedIn, 
  logoutUser);

//route to login user
router.post(
  '/logIn', 
  preventLoginIfAuthenticated,
  saveRedirectUrl, 
  authenticateUser, 
  loginUser); //pehle saveRedirectUrl execute kr rhe taki path ko save kr ske reset hone se pehle


//route to add listing
router.post(
  '/add',
  isLoggedIn, 
  upload.single('listing[image]'), 
  validateListing,
  getCoordinates, 
  addListing
); // Add a new listing


//route to show edit form
router.get(
  '/:id/edit', 
  validateObjectIds('id'),
  isLoggedIn,
  isListingOwner, 
  editListingForm); // Show edit form (must be before ':id')

//route to update listing
router.patch(
  '/:id',
  validateObjectIds('id'), 
  isLoggedIn, 
  upload.single('listing[image]'), 
  validateListing, 
  isListingOwner, 
  updateListing); // Update a listing

//route to delete listing
router.delete(
  '/:id',
  validateObjectIds('id'), 
  isLoggedIn,
  isListingOwner, 
  deleteListing); 

//route to show a single listing
router.get(
  '/:id',
  validateObjectIds('id'), 
  showSingleListing); // Show a single listing (must be last)


export default router;
