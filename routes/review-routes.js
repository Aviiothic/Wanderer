import { Router } from "express";
import { storeReviews } from "../controllers/review-controller.js";
import validateReview from "../middlewares/validate-review.js";

const router = Router({ mergeParams: true }); // ✅ mergeParams is needed
//It ensures that the :id from the parent route (/listings/:id/reviews) is available inside your storeReviews controller via req.params.id.

router.post('/', validateReview, storeReviews); // POST /listings/:id/reviews

export default router;
