import { Router } from "express";

import { isAuthenticated } from "../middleware/auth";
import { createCosts } from "../controllers/CostsController";

const router = Router();

router.post("/create-costs", isAuthenticated, createCosts);

export default router;
