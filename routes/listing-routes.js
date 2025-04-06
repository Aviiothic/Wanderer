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
import { isLoggedIn } from "../middlewares/authentication.js";


const router = Router();


router.get('/', showAllListings); // Get all listings
router.get('/signup', addUserForm); // SignUp User Form
router.post('/signUp',addUser);

router.get('/new', isLoggedIn, addListingForm); // Show form to add a new listing
router.get('/login', loginPage); // Login Page
router.post('/logIn', loginUser); // Login User

router.post('/add', isLoggedIn, validateListing, addListing); //to add a new listing

router.get('/:id/edit', isLoggedIn, editListingForm); // Show edit form (must be before ':id')
router.put('/:id', isLoggedIn, validateListing, updateListing); // Update a listing
router.delete('/:id', isLoggedIn, deleteListing); // Delete a listing


router.get('/:id', showSingleListing); // Show a single listing (must be last)


export default router;
