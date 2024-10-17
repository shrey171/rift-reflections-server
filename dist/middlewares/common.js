import { AppError, supabase } from "../utils/index.js";
import asyncHandler from "express-async-handler";

export const errorHandler = (err, req, res, next) => {
  console.log("ERROR HANDLER:", err);
  const { status = 500, ...error } = err;
  return res.status(status).json(error);
};
export const setPublicRoutes = routes => (req, res, next) => {
  const { path } = req;
  req.protected = true;
  routes.map(route => {
    if (path.startsWith(route)) req.protected = false;
  });
  next();
};
export const checkAuth = asyncHandler(async (req, res, next) => {
  if (!req.protected) return next();
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw new AppError(error);
    req.user = data.user;
    return next();
  }
  res
    .status(401)
    .json({ message: "No authentication token provided. Please log in." });
});
//# sourceMappingURL=common.js.map
