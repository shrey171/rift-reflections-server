import { matchedData, validationResult } from 'express-validator';
import { AppError } from 'utils';
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        req.input = matchedData(req);
        return next();
    }
    const valdiationErrors = {};
    errors.array().map(err => {
        if (err.type === 'field') {
            valdiationErrors[err.path] = err.msg;
        }
    });
    const response = { status: 422, message: 'Validation Error', valdiationErrors };
    throw new AppError(response);
};
//# sourceMappingURL=_validate.js.map