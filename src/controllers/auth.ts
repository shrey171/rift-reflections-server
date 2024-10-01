import { RequestHandler } from "express";
import handler from "express-async-handler";
import { AppError, supabase } from "utils";


const login: RequestHandler = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithPassword(req.input);
  if (error) throw new AppError(error)
  const newToken = data.session.refresh_token
  res.status(200).sendRefreshToken(newToken).json(data);
}

const refresh: RequestHandler = async (req, res) => {
  const refresh_token = req.signedCookies.refresh
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });
  if (error) throw new AppError(error)
  const newToken = data.session.refresh_token
  res.status(200).sendRefreshToken(newToken).json(data);
}

const register: RequestHandler = async (req, res) => {
  const { data, error } = await supabase.auth.signUp(req.input);
  if (error) throw new AppError(error)
  const newToken = data.session.refresh_token
  res.status(200).sendRefreshToken(newToken).json(data);
}


export const authController = {
  login: handler(login),
  refresh: handler(refresh),
  register: handler(register),
}