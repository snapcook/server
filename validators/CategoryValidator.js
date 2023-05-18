const { body, validationResult } = require('express-validator');

const ValidateCategory = [
  body('name')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("name can't be empty")
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

module.exports = ValidateCategory;
