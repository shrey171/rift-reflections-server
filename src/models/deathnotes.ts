import { model, Schema } from 'mongoose';
import { AppError } from 'utils';

const ChampionSchema = new Schema({
  name: { type: String, required: true },
  championId: { type: String, required: true },
})

const noteSchema = new Schema({
  content: { type: String, required: true },
  cause: { type: String, enum: ['marco', 'micro', 'other'], required: true },
  worth: { type: Boolean, default: false },
})

const DeathNoteSchema = new Schema({
  deaths: { type: Number, required: true },
  win: { type: Boolean, default: false },
  userChampion: { type: ChampionSchema, required: true },
  enemyChampion: { type: ChampionSchema, required: true },
  notes: { type: [noteSchema], required: true },
}, {
  timestamps: true
});

DeathNoteSchema.pre('save', function (next) {
  if (this.notes.length <= this.deaths) return next()
  const error = { status: 422, message: 'Cannot have more notes than deaths' };
  return next(new AppError(error));
});

export const DeathNote = model('DeathNote', DeathNoteSchema);