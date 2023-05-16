const { Router } = require('express');
const multer = require('multer');

const RecipeController = require('../controllers/RecipeController');
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
  imageUpload,
  RecipeController.store
);
router.put('/recipe/:id', recipeAuthorization, RecipeController.update);
router.delete('/recipe/:id', recipeAuthorization, RecipeController.destroy);

module.exports = router;
