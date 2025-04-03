import path from 'path';
import { fileURLToPath } from 'url';
import Listing from '../models/listing-model.js';
import Review from '../models/review-model.js';
import wrapAsync from '../utils/wrap-async.js';
import AppError from '../utils/error-util.js';


const defaultImage =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//show all listings
const showAllListings = async(req,res,next)=>{
    try{
        const allListings= await Listing.find();
        res.render('listings/show-all-listings', {allListings})
    }catch(error){
        // console.error('Showing all Listings :', error);
        // res.status(500).send('Internal Server Error');
        next(error);    //custom error handler
    }
}

//from now on we will use wrapAsync instead of try and catch
//show particlular listing with id
const showSingleListing = wrapAsync(async(req, res, next)=>{

        const listingId = req.params.id;
        const listing = await Listing.findById(listingId);
        if(!listing){
            return res.status(404).send('Listing not found');
        }
        res.render('listings/show-single-listing', {listing});
})

//form to add listings
const addListingForm = wrapAsync(async(req, res, next)=>{
        res.render('listings/add-listing-form.ejs');
})

const addListing = wrapAsync(async (req, res, next) => {
    if (!req.body.listing) {
        throw new AppError(400, "Listing is required");
    }

    // Ensure default image is set if image field is empty
    if (!req.body.listing.image || req.body.listing.image.trim() === "") {
        req.body.listing.image = defaultImage;
    }

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    
    res.redirect(`/listings/${newListing._id}`); // ✅ Redirects after successful save
    // res.status(201).json({ success: true, listing: newListing }); // ✅ Sends JSON response
});


//aage wale me try catch hi rhne diya hu kon itna mehnat kre
const editListingForm = async(req,res,next)=>{
    try{
        const listingId = req.params.id;
        const listing = await Listing.findById(listingId);
        if(!listing){
            return res.status(404).send('Listing not found');
        }
        res.render('listings/edit-listing-form', {listing});
    }catch(error){
        console.error('Error Showing Listing :', error);
        res.status(500).send('Internal Server Error');

    }
}

const updateListing = async(req,res,next)=>{
    try{
        const listingId = req.params.id;
        const updatedListing = await Listing.findByIdAndUpdate(listingId, req.body, {new: true}); // new true return updated value
        if(!updatedListing){
            return res.status(404).send('Listing not found');
        }
        res.redirect(`/listings/${updatedListing._id}`);
    }catch(error){
        console.error('Updating Listing :', error);
        res.status(500).send('Internal Server Error');
    }
}

const deleteListing = async (req, res, next) => {
    try {
        const listingId = req.params.id;
        const listing = await Listing.findByIdAndDelete(listingId); // Await the result
        
        if (!listing) {
            return res.status(404).send('Listing not found');
        }
        
        res.redirect('/listings');
    } catch (error) {
        console.error('Deleting Listing:', error);
        res.status(500).send('Internal Server Error');
    }
};


const storeReviews = async(req,res,next)=>{
    try{
        const listingId= req.params.id;
        const newReview = new Review(req.body.review);
        const listing = await Listing.findById(listingId);
        listing.reviews.push(newReview);
        
        await newReview.save();
        await listing.save();
        res.redirect(`/listings/${listingId}`);
    }catch(error){
        console.error('Storing Reviews :', error);
        res.status(500).send('Internal Server Error');
    }
}

export{
    showAllListings,
    showSingleListing,
    addListingForm,
    addListing,
    editListingForm,
    updateListing,
    deleteListing,
    storeReviews
}

/*we use joi for server side validation
we will create a schema but this would be only for the purpose 
of validating the schema, that is the data coming from the clilent
side
*/