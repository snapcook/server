const { Router } = require('express');
const multer = require('multer');

const CategoryController = require('../controllers/CategoryController');
const ValidateCategory = require('../validators/CategoryValidator');
const {
  authentication,
  adminAuthorization,
} = require('../middlewares/auth.js');
const { imageUpload } = require('../middlewares/upload');

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(authentication);
router.get('/category', CategoryController.list);
router.get('/category/:id', adminAuthorization, CategoryController.show);
router.post(
  '/category',
  adminAuthorization,
  upload.single('photo'),
  ValidateCategory,
  imageUpload,
  CategoryController.store
);
router.put(
  '/category/:id',
  adminAuthorization,
  upload.single('photo'),
  ValidateCategory,
  imageUpload,
  CategoryController.update
);
router.delete('/category/:id', adminAuthorization, CategoryController.destroy);

module.exports = router;
