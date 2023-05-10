const { Router } = require('express');
const CategoryRouter = require('./category');
const AuthRouter = require('./auth');

const router = Router();

router.get('/', (req, res) => {
  res.send('⚡️ Server is running!');
});

router.use(AuthRouter);
router.use(CategoryRouter);

module.exports = router;
