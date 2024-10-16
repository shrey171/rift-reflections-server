import { model, Schema } from 'mongoose';
import { AppError } from 'utils';
const noteSchema = new Schema({
    content: String,
    cause: { type: String, enum: ['macro', 'micro', 'other'], required: true },
    worth: { type: Boolean, default: false },
}, { _id: false });
const DeathNoteSchema = new Schema({
    deaths: { type: Number, required: true },
    date: { type: Date, required: true },
    win: { type: Boolean, default: false },
    user: { type: String, required: true },
    userChampion: { type: String, required: true },
    enemyChampion: { type: String, required: true },
    notes: { type: [noteSchema], required: true },
}, {
    timestamps: true
});
DeathNoteSchema.pre('save', function (next) {
    if (this.notes.length <= this.deaths)
        return next();
    const error = { status: 422, message: 'Cannot have more notes than deaths' };
    return next(new AppError(error));
});
export const DeathNote = model('DeathNote', DeathNoteSchema);
//# sourceMappingURL=deathnotes.js.map