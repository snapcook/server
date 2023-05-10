const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const {
  authentication,
  adminAuthorization,
} = require('../middlewares/auth.js');

const router = Router();

router.use(authentication);
router.get('/category', CategoryController.list);
router.get('/category/:id', adminAuthorization, CategoryController.show);
router.post('/category', adminAuthorization, CategoryController.store);
router.put('/category/:id', adminAuthorization, CategoryController.update);
router.delete('/category/:id', adminAuthorization, CategoryController.destroy);

module.exports = router;
