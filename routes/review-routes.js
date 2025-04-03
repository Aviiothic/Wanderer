import { Router } from "express";
import { storeReviews } from "../controllers/review-controller.js";
const router = Router();

router.post('/:id/reviews', storeReviews); // Store reviews for a listing

export default router;