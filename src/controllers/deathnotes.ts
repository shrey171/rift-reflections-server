import { RequestHandler } from "express";
import handler from "express-async-handler";
import { DeathNote } from "models";

const get: RequestHandler = async (req, res) => {
  const { user } = req;
  const notes = await DeathNote.find({ user: user.id }).sort({ createdAt: -1 }).lean();
  res.json(notes);
}

const create: RequestHandler = async (req, res) => {
  const { user, input } = req;
  const newNotes = await DeathNote.create({ ...input, user: user.id });
  res.json(newNotes);
}


export const deathNotesController = {
  create: handler(create),
  get: handler(get),
}