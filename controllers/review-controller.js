import Listing from '../models/listing-model.js';
import Review from '../models/review-model.js';
import wrapAsync from '../utils/wrap-async.js';

const storeReviews = wrapAsync(async (req, res, next) => {
    const listingId = req.params.id;
    const newReview = new Review(req.body.review);

    const listing = await Listing.findById(listingId);
    if (!listing) {
        return res.status(404).send('Listing not found');
    }

    listing.reviews.push(newReview); // ✅ Add review to listing
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listingId}`);
    //res.status(201).json({ success: true, review: newReview })
});

const deleteReview = wrapAsync(async (req,res, next)=>{
    let {id, reviewId} = req.params;
    // console.log(req.params);
    // console.log(id, reviewId);

    const listing = await Listing.findById(id);
    if(!listing){
        return res.status(404).send('Listing not fund');
    }
    
    const review = await Review.findById(reviewId);
    if(!review){
        return res.status(404).send('Review not found');
    }

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);

})

export {
    storeReviews,
    deleteReview
}