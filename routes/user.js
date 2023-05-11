const { Router } = require('express');
const UserController = require('../controllers/UserController');
const {
  authentication,
  adminAuthorization,
  userAuthorization,
} = require('../middlewares/auth.js');

const router = Router();

router.use(authentication);
router.get('/user', adminAuthorization, UserController.list);
router.get('/user/:id', UserController.show);
router.put('/user/:id', userAuthorization, UserController.update);
router.delete('/user/:id', adminAuthorization, UserController.destroy);

module.exports = router;
