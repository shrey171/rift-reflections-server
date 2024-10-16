export class AppError extends Error {
    status;
    message;
    type;
    constructor(error) {
        super();
        const { status, message, name, ...details } = error;
        this.status = status;
        this.message = message;
        this.type = name;
        Object.keys(details).forEach(key => {
            this[key] = details[key];
        });
    }
}
//# sourceMappingURL=AppError.js.map