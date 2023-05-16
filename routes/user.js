const { Router } = require('express');
const multer = require('multer');

const UserController = require('../controllers/UserController');
const {
  authentication,
  adminAuthorization,
  userAuthorization,
} = require('../middlewares/auth.js');
const { imageUpload } = require('../middlewares/upload');

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(authentication);
router.get('/user', adminAuthorization, UserController.list);
router.get('/user/:id', UserController.show);
router.put(
  '/user/:id',
  userAuthorization,
  upload.single('photo'),
  imageUpload,
  UserController.update
);
router.delete('/user/:id', adminAuthorization, UserController.destroy);

module.exports = router;
