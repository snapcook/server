const { Router } = require('express');
const RecipeController = require('../controllers/RecipeController');
const {
  authentication,
  recipeAuthorization,
} = require('../middlewares/auth.js');

const router = Router();

router.use(authentication);
router.get('/recipe', RecipeController.list);
router.get('/recipe/:slug', RecipeController.show);
router.post('/recipe', RecipeController.store);
router.put('/recipe/:id', recipeAuthorization, RecipeController.update);
router.delete('/recipe/:id', recipeAuthorization, RecipeController.destroy);

module.exports = router;
