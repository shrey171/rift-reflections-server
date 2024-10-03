import { RequestHandler } from "express";
import handler from "express-async-handler";
import { AppError, supabase } from "utils";

const get: RequestHandler = async (req, res) => {
  res.json(req.user)
}

const create: RequestHandler = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithPassword(req.input);
  if (error) throw new AppError(error)
  const newToken = data.session.refresh_token
  res.status(200).sendRefreshToken(newToken).json(data);
}


export const deathNotesController = {
  create: handler(create),
  get: handler(get),
}