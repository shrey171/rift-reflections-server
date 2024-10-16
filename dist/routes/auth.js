import { Router } from "express";
import { authController } from "../controllers";
import { authValidators, validate } from "../middlewares";
const { login, me, register, refresh } = authController;
const { main } = authValidators;
const router = Router();
router.get("/refresh", refresh);
router.get("/me", me);
router.post("/register", main(), validate, register);
router.post("/login", main(), validate, login);
export const authRouter = router;
//# sourceMappingURL=auth.js.map