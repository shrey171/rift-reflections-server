import handler from "express-async-handler";
import { supabase, AppError } from "../utils/index.js";
const login = async (req, res) => {
    const { data, error } = await supabase.auth.signInWithPassword(req.input);
    if (error)
        throw new AppError(error);
    const newToken = data.session.refresh_token;
    res.status(200).sendRefreshToken(newToken).json(data);
};
const refresh = async (req, res) => {
    const refresh_token = req.signedCookies.refresh;
    const { data, error } = await supabase.auth.refreshSession({ refresh_token });
    if (error)
        throw new AppError(error);
    const newToken = data.session.refresh_token;
    res.status(200).sendRefreshToken(newToken).json(data);
};
const register = async (req, res) => {
    const { data, error } = await supabase.auth.signUp(req.input);
    if (error)
        throw new AppError(error);
    const newToken = data.session.refresh_token;
    res.status(200).sendRefreshToken(newToken).json(data);
};
const me = async (req, res) => {
    const { data, error } = await supabase.auth.getUser();
    if (error)
        throw new AppError(error);
    res.status(200).json(data);
};
export const authController = {
    login: handler(login),
    refresh: handler(refresh),
    register: handler(register),
    me: handler(me),
};
//# sourceMappingURL=auth.js.map