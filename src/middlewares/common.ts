import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { status = 500, ...error } = err;
  res.status(status).json(error);
}