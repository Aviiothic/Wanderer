import { Router } from "express";
import { storeReviews, deleteReview } from "../controllers/review-controller.js";
import validateReview from "../middlewares/validate-review.js";
import { isLoggedIn, isReviewAuthor } from "../middlewares/authentication.js";

const router = Router({ mergeParams: true }); // ✅ mergeParams is needed
//It ensures that the :id from the parent route (/listings/:id/reviews) is available inside your storeReviews controller via req.params.id.
//agar hum ye use na krenge to (/listings/:id/reviews) ye id hume na mil payega kyuki uske bina
//is route pe hame param me /listings/:id/reviews ke bad agar kuchh hoga to wahi milta hai

router.post('/', isLoggedIn,validateReview, storeReviews); // POST /listings/:id/reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, deleteReview); // DELETE /listings/:id/reviews/:reviewId    

export default router;
