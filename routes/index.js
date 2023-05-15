const { Router } = require('express');
const AuthRouter = require('./auth');
const UserRouter = require('./user');
const CategoryRouter = require('./category');
const RecipeRouter = require('./recipe');
const BookmarkRouter = require('./bookmark');
const NoteRouter = require('./note');

const router = Router();

router.get('/', (req, res) => {
  res.send('⚡️ Server is running!');
});

router.use(AuthRouter);
router.use(UserRouter);
router.use(CategoryRouter);
router.use(RecipeRouter);
router.use(BookmarkRouter);
router.use(NoteRouter);

module.exports = router;
