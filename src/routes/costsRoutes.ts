import { Router } from "express";

import { isAuthenticated } from "../middleware/auth";
import {
  createCosts,
  getAllRegistrosCostos,
  getEvolucionCostos,
  getRegistroCompleto,
} from "../controllers/CostsController";

const router = Router();

router.post("/create-costs", isAuthenticated, createCosts);
router.get("/get-all-costs", isAuthenticated, getAllRegistrosCostos);
router.get("/get-cost-by-id/:id", isAuthenticated, getRegistroCompleto);
router.get("/get-evolution-costs", isAuthenticated, getEvolucionCostos);

export default router;
