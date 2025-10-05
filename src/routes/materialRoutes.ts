import { Router } from "express";

import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { isAuthenticated } from "../middleware/auth";
import {
  createMateriaPrima,
  getMateriaPrimaById,
  getMateriaPrimas,
  searchMaterialPrima,
  updateMateriaPrima,
} from "../controllers/materialController";

const router = Router();

router.post(
  "/create-material",
  body("name").isLength({ min: 3 }).withMessage("Nombre inválido"),
  handleInputErrors,
  isAuthenticated,
  createMateriaPrima
);
router.patch(
  "/update-materia/:id",
  body("nombre").isLength({ min: 3 }).withMessage("Nombre inválido"),
  handleInputErrors,
  isAuthenticated,
  updateMateriaPrima
);
router.get("/get-materia-by-id/:id", isAuthenticated, getMateriaPrimaById);
router.get("/get-materias", isAuthenticated, getMateriaPrimas);
router.get("/search-materia", isAuthenticated, searchMaterialPrima);

export default router;
