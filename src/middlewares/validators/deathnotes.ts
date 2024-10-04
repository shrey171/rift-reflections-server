import { body } from "express-validator"

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

  // Validate the 'userChampion' field: it must have a 'name' and 'championId' 
  body('userChampion.name')
    .notEmpty()
    .withMessage('User champion name is required.'),
  body('userChampion.championId')
    .notEmpty()
    .withMessage('User champion ID is required.'),

  // Validate the 'enemyChampion' field: it must have a 'name' and 'championId'
  body('enemyChampion.name')
    .notEmpty()
    .withMessage('Enemy champion name is required.'),
  body('enemyChampion.championId')
    .notEmpty()
    .withMessage('Enemy champion ID is required.'),

  // Validate the 'notes' array
  body('notes')
    .optional()
    .isArray()
    .withMessage('Notes should be an array.'),

  // Validate each note in the 'notes' array
  body('notes.*.content')
    .notEmpty()
    .withMessage('Note content is required.'),
  body('notes.*.cause')
    .isIn(['marco', 'micro', 'other'])
    .withMessage('Cause must be one of: "marco", "micro", or "other".'),
  body('notes.*.worth')
    .optional()
    .isBoolean()
    .withMessage('Worth must be a boolean value.'),

]


export const deathNotesValidators = { create }