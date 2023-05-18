const { body, validationResult } = require('express-validator');

const ValidateNote = [
  body('authorId')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("authorId can't be empty")
    .bail(),
  body('title')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("title can't be empty")
    .bail(),
  body('description')
    .isArray({ min: 1 })
    .bail()
    .notEmpty()
    .withMessage("description can't be empty")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = ValidateNote;
