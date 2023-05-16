const { Router } = require('express');
const NoteController = require('../controllers/NoteController');
const { authentication, noteAuthorization } = require('../middlewares/auth');

const router = Router();

router.use(authentication);
router.get('/note', NoteController.list);
router.get('/note/:id', noteAuthorization, NoteController.show);
router.post('/note', NoteController.store);
router.put('/note/:id', noteAuthorization, NoteController.update);
router.delete('/note/:id', noteAuthorization, NoteController.destroy);

module.exports = router;
