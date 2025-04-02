import { Router } from "express";
import {
  showAllListings,
  showSingleListing,
  addListingForm,
  addListing,
  editListingForm,
  updateListing,
  deleteListing,
  storeReviews
} from '../controllers/listing-controllers.js';
import validateListing from "../middlewares/validate.js";

const router = Router();

router.get('/', showAllListings); // Get all listings
router.get('/new', addListingForm); // Show form to add a new listing

router.post('/add', addListing); //to add a new listing

router.get('/:id/edit', editListingForm); // Show edit form (must be before ':id')
router.put('/:id', updateListing); // Update a listing
router.delete('/:id', deleteListing); // Delete a listing

router.post('/:id/reviews', storeReviews); // Store reviews for a listing (must be before ':id')
router.get('/:id', showSingleListing); // Show a single listing (must be last)


export default router;
