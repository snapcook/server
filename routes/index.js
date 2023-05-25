const { Router } = require('express');
const AuthRouter = require('./auth');
const UserRouter = require('./user');
const CategoryRouter = require('./category');
const UtensilRouter = require('./utensil');
const RecipeRouter = require('./recipe');
const BookmarkRouter = require('./bookmark');
const NoteRouter = require('./note');
const ModelRouter = require('./model');

const router = Router();

router.get('/', (req, res) => {
  res.send('🥗 Server is cooking well!');
});

router.use(AuthRouter);
router.use(UserRouter);
router.use(CategoryRouter);
router.use(UtensilRouter);
router.use(RecipeRouter);
router.use(BookmarkRouter);
router.use(NoteRouter);
router.use(ModelRouter);

module.exports = router;
