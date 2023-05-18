const { body, validationResult } = require('express-validator');

const ValidateBookmark = [
  body('authorId')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("authorId can't be empty")
    .bail(),
  body('recipeId')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("recipeId can't be empty")
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

module.exports = ValidateBookmark;
