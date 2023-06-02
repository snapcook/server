const { Router } = require('express');

const BookmarkController = require('../controllers/BookmarkController');
const ValidateBookmark = require('../validators/BookmarkValidator');
const {
  authentication,
  bookmarkAuthorization,
} = require('../middlewares/auth.js');

const router = Router();

router.use(authentication);
router.get('/bookmark/:id', BookmarkController.list);
router.post('/bookmark', ValidateBookmark, BookmarkController.store);
router.delete(
  '/bookmark/:recipeId',
  bookmarkAuthorization,
  BookmarkController.destroy
);

module.exports = router;
