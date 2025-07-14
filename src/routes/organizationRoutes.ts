import { Router } from "express";
import { createOrganization } from "../controllers/OrganizationController";
import { isAuthenticated } from "../middleware/auth";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-organization",
  body("name").isLength({ min: 3 }).withMessage("Nombre inválido"),
  body("nit").isLength({ min: 3 }).withMessage("NIT inválido"),
  body("nameAdmin").isLength({ min: 3 }).withMessage("Nombre inválido"),
  body("email").isEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los Password no son iguales");
    }
    return true;
  }),
  handleInputErrors,
  isAuthenticated,
  createOrganization
);

export default router;
