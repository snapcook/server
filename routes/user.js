const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/user', UserController.list);
router.get('/user/:id', UserController.show);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

module.exports = router;
