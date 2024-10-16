import { body } from "express-validator";
const create = () => [
    body('deaths')
        .isInt({ min: 0 }).withMessage("Are you really entering a negative number?! Come on!")
        .isLength({ min: 0, max: 20 }).withMessage('')
        .notEmpty().escape().withMessage('Deaths Required')
        .custom(value => value < 20).withMessage('More than 20 deaths?! You have more important things to worry about than this!'),
    body('win')
        .optional()
        .isBoolean()
        .withMessage('Win must be a boolean value.'),
    // Validate the 'userChampion' field'
    body('userChampion')
        .notEmpty()
        .withMessage('User champion name is required.'),
    // Validate the 'enemyChampion' field
    body('enemyChampion')
        .notEmpty()
        .withMessage('Enemy champion name is required.'),
    body('date')
        .isISO8601()
        .withMessage('Date must be a valid date')
];
const editNotes = () => [
    body('notes.*.content').optional().isString().withMessage('Content must be a string.'),
    body('notes.*.cause')
        .isIn(['macro', 'micro', 'other'])
        .withMessage('Cause must be one of the following: macro, micro, other.')
        .exists().withMessage('Cause is required.'),
    body('notes.*.worth')
        .isBoolean().withMessage('Worth must be a boolean.')
];
export const deathNotesValidators = { create, editNotes };
//# sourceMappingURL=deathnotes.js.map