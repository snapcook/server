const { Router } = require('express');
const BookmarkController = require('../controllers/BookmarkController');
const {
  authentication,
  bookmarkAuthorization,
} = require('../middlewares/auth.js');

const router = Router();

router.use(authentication);
router.get('/bookmark/:id', BookmarkController.list);
router.post('/bookmark', BookmarkController.store);
router.delete(
  '/bookmark/:id',
  bookmarkAuthorization,
  BookmarkController.destroy
);

module.exports = router;
