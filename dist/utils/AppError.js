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
export class AppError extends Error {
    constructor(error) {
        super();
        const { status, message, name } = error, details = __rest(error, ["status", "message", "name"]);
        this.status = status;
        this.message = message;
        this.type = name;
        Object.keys(details).forEach(key => {
            this[key] = details[key];
        });
    }
}
//# sourceMappingURL=AppError.js.map