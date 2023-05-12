const { Router } = require('express');
const AuthRouter = require('./auth');
const UserRouter = require('./user');
const CategoryRouter = require('./category');
const RecipeRouter = require('./recipe');

const router = Router();

router.get('/', (req, res) => {
  res.send('⚡️ Server is running!');
});

router.use(AuthRouter);
router.use(UserRouter);
router.use(CategoryRouter);
router.use(RecipeRouter);

module.exports = router;
