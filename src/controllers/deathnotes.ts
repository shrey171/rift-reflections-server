import { RequestHandler } from "express";
import handler from "express-async-handler";
import { DeathNote } from "../models";
import { AppError } from "../utils";

const get: RequestHandler = async (req, res) => {
  const { user } = req;
  const notes = await DeathNote.find({ user: user.id }).sort({ date: -1 }).lean();
  res.json(notes);
}

const create: RequestHandler = async (req, res) => {
  const { user, input } = req;
  let notes: any = [];
  for (let i = 0; i < input.deaths; i++) {
    notes.push({ content: '', cause: 'macro', worth: false });
  }
  const newNotes = await DeathNote.create({ ...input, user: user.id, notes });
  res.json(newNotes);
}

const editNotes: RequestHandler = async (req, res) => {
  const { user, input, params } = req;
  const { notes } = input;
  if (!notes) throw new AppError({ status: 400, message: 'No notes provided' });
  const newNotes = await DeathNote.findById(params?.id);
  if (!newNotes) throw new AppError({ status: 404, message: 'Death note not found' });
  if (newNotes.user !== user.id) throw new AppError({ status: 403, message: 'Unauthorized' });
  newNotes.notes = notes;
  await newNotes.save();
  res.json(newNotes);
}


export const deathNotesController = {
  create: handler(create),
  get: handler(get),
  editNotes: handler(editNotes),
}