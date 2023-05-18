const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const ValidateCategory = require('../validators/CategoryValidator');
const {
  authentication,
  adminAuthorization,
} = require('../middlewares/auth.js');

const router = Router();

router.use(authentication);
router.get('/category', CategoryController.list);
router.get('/category/:id', adminAuthorization, CategoryController.show);
router.post(
  '/category',
  adminAuthorization,
  ValidateCategory,
  CategoryController.store
);
router.put(
  '/category/:id',
  adminAuthorization,
  ValidateCategory,
  CategoryController.update
);
router.delete('/category/:id', adminAuthorization, CategoryController.destroy);

module.exports = router;
