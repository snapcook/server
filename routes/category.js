const { Router } = require('express');
const CategoryController = require('../controller/CategoryController');

const router = Router();

router.get('/category', CategoryController.list);
router.get('/category/:id', CategoryController.show);
router.post('/category', CategoryController.store);
router.put('/category/:id', CategoryController.update);
router.delete('/category/:id', CategoryController.destroy);

module.exports = router;
