import { Router } from "express";
import { body, param } from "express-validator";
import {
  createAccount,
  login,
  getUser,
  createUserOrganization,
  getUsersAllOrganization,
} from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { isAuthenticated } from "../middleware/auth";

const router = Router();
router.post(
  "/create-account",
  body("name").isLength({ min: 3 }).withMessage("Nombre inválido"),
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
  createAccount
);
router.post(
  "/login",
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("La contraseña no puede ir vacia"),
  handleInputErrors,
  login
);
router.get("/check-auth", isAuthenticated, getUser);
router.post(
  "/create-user-organization",
  isAuthenticated,
  createUserOrganization
);

router.get(
  "/get-users-all-organization",
  isAuthenticated,
  getUsersAllOrganization
);

export default router;
