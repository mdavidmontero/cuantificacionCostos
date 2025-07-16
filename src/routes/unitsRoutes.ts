import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { isAuthenticated } from "../middleware/auth";
import {
  createMeasurement,
  getMeasurementById,
  getMeasurements,
  updateMeasurement,
} from "../controllers/UnitsMeasurementController";

const router = Router();

router.post(
  "/create-unit",
  body("name").isLength({ min: 1 }).withMessage("Nombre inválido"),
  handleInputErrors,
  isAuthenticated,
  createMeasurement
);
router.patch(
  "/update-unit/:id",
  body("name").isLength({ min: 1 }).withMessage("Nombre inválido"),
  handleInputErrors,
  isAuthenticated,
  updateMeasurement
);
router.get("/get-unit-by-id/:id", isAuthenticated, getMeasurementById);
router.get("/get-units", isAuthenticated, getMeasurements);

export default router;
