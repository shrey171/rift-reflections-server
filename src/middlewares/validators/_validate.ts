import { matchedData, validationResult } from 'express-validator'
import { RequestHandler } from 'express';
import { AppError } from 'utils';
import { IObject } from 'types';


export const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    req.input = matchedData(req);
    return next();
  }
  const valdiationErrors: IObject = {}
  errors.array().map(err => {
    if (err.type === 'field') {
      valdiationErrors[err.path] = err.msg
    }
  });
  const response = { status: 422, message: 'Validation Error', valdiationErrors }
  throw new AppError(response)
}