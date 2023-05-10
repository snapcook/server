const { Router } = require('express');
const AuthRouter = require('./auth');
const UserRouter = require('./user');
const CategoryRouter = require('./category');

const router = Router();

router.get('/', (req, res) => {
  res.send('⚡️ Server is running!');
});

router.use(AuthRouter);
router.use(UserRouter);
router.use(CategoryRouter);

module.exports = router;
