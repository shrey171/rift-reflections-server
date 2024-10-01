export const setCustomResponseMethods = (req, res, next) => {
    res.sendRefreshToken = token => res.cookie("refresh", token, { httpOnly: true, signed: true });
    next();
};
//# sourceMappingURL=common.js.map