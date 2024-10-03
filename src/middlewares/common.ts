import { ErrorRequestHandler, RequestHandler } from "express";
import { AppError, supabase } from "utils";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { status = 500, ...error } = err;
  res.status(status).json(error);
}

export const setPublicRoutes: (routes: string[]) => RequestHandler = routes =>
  (req, res, next) => {
    const { path } = req;
    req.protected = true;
    routes.map(route => {
      if (path.startsWith(route)) req.protected = false
    })
    next()
  }

export const checkAuth: RequestHandler = async (req, res, next) => {
  if (!req.protected) return next();
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw new AppError(error);
    req.user = data.user;
    return next();
  }
  res.status(401).json({ message: 'No authentication token provided. Please log in.' });
}

