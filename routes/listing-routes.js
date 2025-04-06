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
  loginUser
} from '../controllers/listing-controllers.js';

import validateListing from "../middlewares/validate-listing.js";
import passport from "passport";


const router = Router();


router.get('/', showAllListings); // Get all listings
router.get('/signup', addUserForm); // SignUp User Form
router.post('/signUp',addUser);

router.get('/new', addListingForm); // Show form to add a new listing
router.get('/login', loginPage); // Login Page
router.post('/logIn', loginUser); // Login User

router.post('/add', validateListing, addListing); //to add a new listing

router.get('/:id/edit', editListingForm); // Show edit form (must be before ':id')
router.put('/:id', validateListing, updateListing); // Update a listing
router.delete('/:id', deleteListing); // Delete a listing


router.get('/:id', showSingleListing); // Show a single listing (must be last)


export default router;
