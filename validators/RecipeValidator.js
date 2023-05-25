const { body, validationResult } = require('express-validator');

const ValidateRecipe = [
  body('mainCategory')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("mainCategory can't be empty")
    .bail(),
  body('secondCategoryId')
    .isString()
    .bail()
    .notEmpty()
    .withMessage("secondCategoryId can't be empty")
    .bail(),
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
    .isString()
    .bail()
    .notEmpty()
    .withMessage("description can't be empty")
    .bail(),
  body('totalServing')
    .isInt({ min: 0 })
    .bail()
    .notEmpty()
    .withMessage("totalServing can't be empty")
    .bail()
    .toInt(),
  body('mainIngredients')
    .isArray({ min: 1 })
    .bail()
    .notEmpty()
    .withMessage("mainIngredients can't be empty")
    .bail(),
  body('spices')
    .isArray({ min: 0 })
    .bail()
    .notEmpty()
    .withMessage("spices can't be empty")
    .bail(),
  body('utensils')
    .isArray({ min: 1 })
    .bail()
    .notEmpty()
    .withMessage("utensils can't be empty")
    .bail(),
  body('estimatedTime')
    .isInt({ min: 0 })
    .bail()
    .notEmpty()
    .withMessage("estimatedTime can't be empty")
    .bail()
    .toInt(),
  body('steps')
    .isArray({ min: 1 })
    .bail()
    .notEmpty()
    .withMessage("steps can't be empty")
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

module.exports = ValidateRecipe;
