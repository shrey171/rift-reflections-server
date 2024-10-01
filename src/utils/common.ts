import { RequestHandler } from "express"

export const setCustomResponseMethods: RequestHandler = (req, res, next) => {
  res.sendRefreshToken = token => res.cookie("refresh", token, { httpOnly: true, signed: true });
  next()
}