import { Router } from "express";
import { deathNotesController as c } from "../controllers/index.js";
import { deathNotesValidators as v, validate } from "../middlewares/index.js";
const router = Router();
router.get("/", c.get);
router.post("/", v.create(), validate, c.create);
router.patch("/:id", v.editNotes(), validate, c.editNotes);
export const deathNotesRouter = router;
//# sourceMappingURL=deathnotes.js.map