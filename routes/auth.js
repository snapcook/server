const { Router } = require('express');

const AuthController = require('../controllers/AuthController');
const ValidateUser = require('../validators/UserValidator');

const router = Router();

router.post('/register', ValidateUser, AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router;
