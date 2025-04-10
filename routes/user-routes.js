import { Router } from "express";
import{
    getUserProfile
} from "../controllers/user-controller.js";

const router = Router({ mergeParams: true });

router.get('/:id', getUserProfile);

export default router;
