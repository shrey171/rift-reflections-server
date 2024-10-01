import { body } from "express-validator";
// const register = () => [
//   body('username')
//     .isLength({ min: 4, max: 30 }).withMessage('Username must be 4-30 characters long')
//     .trim().notEmpty().escape().withMessage('Username Required'),
//   body('email')
//     .isEmail().withMessage('Must be a valid Email').toLowerCase()
//     .trim().notEmpty().escape().withMessage('Email Required'),
// body('password')
//   .isAlphanumeric().withMessage("Only numbers and alphabets are allowed")
//   .isLength({ min: 6, max: 20 }).withMessage('Password must be 6-20 characters long')
//   .notEmpty().escape().withMessage('Password Required'),
// ]
const main = () => [
    body('password')
        .isAlphanumeric().withMessage("Only numbers and alphabets are allowed")
        .isLength({ min: 6, max: 20 }).withMessage('Password must be 6-20 characters long')
        .notEmpty().escape().withMessage('Password Required'),
    body('email')
        .isEmail().withMessage('Must be a valid Email').toLowerCase()
        .trim().notEmpty().escape().withMessage('Email Required')
];
export const authValidators = { main };
//# sourceMappingURL=auth.js.map