var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import handler from "express-async-handler";
import { DeathNote } from "models";
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const notes = yield DeathNote.find({ user: user.id }).sort({ createdAt: -1 }).lean();
    res.json(notes);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, input } = req;
    const newNotes = yield DeathNote.create(Object.assign(Object.assign({}, input), { user: user.id }));
    res.json(newNotes);
});
export const deathNotesController = {
    create: handler(create),
    get: handler(get),
};
//# sourceMappingURL=deathnotes.js.map