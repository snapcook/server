const { Router } = require('express');
const multer = require('multer');

const UtensilController = require('../controllers/UtensilController');
const ValidateUtensil = require('../validators/UtensilValidator');
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
router.get('/utensil', UtensilController.list);
router.get('/utensil/:id', adminAuthorization, UtensilController.show);
router.post(
  '/utensil',
  adminAuthorization,
  upload.single('photo'),
  imageUpload,
  UtensilController.store
);
router.put(
  '/utensil/:id',
  adminAuthorization,
  upload.single('photo'),
  ValidateUtensil,
  imageUpload,
  UtensilController.update
);
router.delete('/utensil/:id', adminAuthorization, UtensilController.destroy);

module.exports = router;
