import { authController } from "controllers";
import { Router } from "express";
import { authValidators, validate } from "middlewares";

const { login, register } = authController
const { main } = authValidators
const router = Router();

router.post("/register", main(), validate, register)
router.post("/login", main(), validate, login)

export const authRoutes = router