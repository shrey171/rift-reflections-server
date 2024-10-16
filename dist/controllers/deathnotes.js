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
import { AppError } from "utils";
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const notes = yield DeathNote.find({ user: user.id }).sort({ date: -1 }).lean();
    res.json(notes);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, input } = req;
    let notes = [];
    for (let i = 0; i < input.deaths; i++) {
        notes.push({ content: '', cause: 'macro', worth: false });
    }
    const newNotes = yield DeathNote.create(Object.assign(Object.assign({}, input), { user: user.id, notes }));
    res.json(newNotes);
});
const editNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, input, params } = req;
    const { notes } = input;
    if (!notes)
        throw new AppError({ status: 400, message: 'No notes provided' });
    const newNotes = yield DeathNote.findById(params === null || params === void 0 ? void 0 : params.id);
    if (!newNotes)
        throw new AppError({ status: 404, message: 'Death note not found' });
    if (newNotes.user !== user.id)
        throw new AppError({ status: 403, message: 'Unauthorized' });
    newNotes.notes = notes;
    yield newNotes.save();
    res.json(newNotes);
});
export const deathNotesController = {
    create: handler(create),
    get: handler(get),
    editNotes: handler(editNotes),
};
//# sourceMappingURL=deathnotes.js.map