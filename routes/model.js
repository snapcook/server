const { Router } = require('express');
const ModelController = require('../controllers/ModelController');
const { authentication } = require('../middlewares/auth.js');

const router = Router();

router.use(authentication);
router.post('/predict', ModelController.predict);

module.exports = router;
