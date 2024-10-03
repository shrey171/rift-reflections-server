import { Router } from "express";
import { deathNotesController as c } from "controllers";
import { deathNotesValidators as v, validate } from "middlewares";
const router = Router();
router.get("/", c.get);
router.post("/", v.create(), validate, c.create);
export const deathNotesRouter = router;
//# sourceMappingURL=deathnotes.js.map