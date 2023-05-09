const { Router } = require('express');
const CategoryController = require('../controller/CategoryController');

const router = Router();

router.get('/category', CategoryController.getCategory);
router.get('/category/:id', CategoryController.getDetailCategory);
router.post('/category', CategoryController.addCategory);
router.put('/category/:id', CategoryController.editCategory);
router.delete('/category/:id', CategoryController.deleteCategory);

module.exports = router;
