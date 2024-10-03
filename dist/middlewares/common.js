var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { AppError, supabase } from "utils";
export const errorHandler = (err, req, res, next) => {
    const { status = 500 } = err, error = __rest(err, ["status"]);
    res.status(status).json(error);
};
export const setPublicRoutes = routes => (req, res, next) => {
    const { path } = req;
    req.protected = true;
    routes.map(route => {
        if (path.startsWith(route))
            req.protected = false;
    });
    next();
};
export const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.protected)
        return next();
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (token) {
        const { data, error } = yield supabase.auth.getUser(token);
        if (error)
            throw new AppError(error);
        req.user = data.user;
        return next();
    }
    res.status(401).json({ message: 'No authentication token provided. Please log in.' });
});
//# sourceMappingURL=common.js.map