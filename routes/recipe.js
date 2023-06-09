const { Router } = require('express');
const multer = require('multer');

const RecipeController = require('../controllers/RecipeController');
const ValidateRecipe = require('../validators/RecipeValidator');
const { authentication, recipeAuthorization } = require('../middlewares/auth');
const { imageUpload } = require('../middlewares/upload');

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(authentication);
router.get('/recipe', RecipeController.list);
router.get('/recipe/:slug', RecipeController.show);
router.post(
  '/recipe',
  upload.single('photo'),
  ValidateRecipe,
  imageUpload,
  RecipeController.store
);
router.put(
  '/recipe/:id',
  recipeAuthorization,
  upload.single('photo'),
  ValidateRecipe,
  imageUpload,
  RecipeController.update
);
router.delete('/recipe/:id', recipeAuthorization, RecipeController.destroy);

module.exports = router;
