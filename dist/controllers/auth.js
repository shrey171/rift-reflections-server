var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import handler from "express-async-handler";
import { AppError, supabase } from "utils";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.auth.signInWithPassword(req.input);
    if (error)
        throw new AppError(error);
    const newToken = data.session.refresh_token;
    res.status(200).sendRefreshToken(newToken).json(data);
});
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_token = req.signedCookies.refresh;
    const { data, error } = yield supabase.auth.refreshSession({ refresh_token });
    if (error)
        throw new AppError(error);
    const newToken = data.session.refresh_token;
    res.status(200).sendRefreshToken(newToken).json(data);
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.auth.signUp(req.input);
    if (error)
        throw new AppError(error);
    const newToken = data.session.refresh_token;
    res.status(200).sendRefreshToken(newToken).json(data);
});
export const authController = {
    login: handler(login),
    refresh: handler(refresh),
    register: handler(register),
};
//# sourceMappingURL=auth.js.map