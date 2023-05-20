const { Router } = require('express');
const multer = require('multer');

const ModelController = require('../controllers/ModelController');
const { authentication } = require('../middlewares/auth.js');

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(authentication);
router.post('/predict', upload.single('photo'), ModelController.predict);

module.exports = router;
