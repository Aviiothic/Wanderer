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

import { 
    isLoggedIn, 
    authenticateUser, 
    saveRedirectUrl, 
    isListingOwner 
  } from "../middlewares/authentication.js";



const router = Router();

// route to Get all listings
router.get(
  '/', 
  showAllListings); 

// route to show SignUp User Form
router.get(
  '/signup', 
  addUserForm);

// route to signup user
router.post(
  '/signUp',
  addUser);

// route to  Show form to add a new listing
router.get(
  '/new', 
  isLoggedIn, 
  addListingForm); 

// route to show login page
router.get(
  '/login', 
  loginPage); 

// route to logout user
router.get(
  '/logout', 
  isLoggedIn, 
  logoutUser);

//route to login user
router.post(
  '/logIn', 
  saveRedirectUrl, 
  authenticateUser, 
  loginUser); // Login User
//pehle saveRedirectUrl execute kr rhe taki path ko save kr ske reset hone se pehle

//route to add new listing
router.post(
  '/add', 
  isLoggedIn, 
  validateListing, 
  addListing); //to add a new listing

//route to show edit form
router.get(
  '/:id/edit', 
  validateObjectIds('id'),
  isLoggedIn,
  isListingOwner, 
  editListingForm); // Show edit form (must be before ':id')

//route to update listing
router.put(
  '/:id',
  validateObjectIds('id'), 
  isLoggedIn, 
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
