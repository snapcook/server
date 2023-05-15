const { Router } = require('express');
const NoteController = require('../controllers/NoteController');
const { noteAuthorization } = require('../middlewares/auth');

const router = Router();

router.get('/note', NoteController.list);
router.get('/note/:id', noteAuthorization, NoteController.show);
router.post('/note', noteAuthorization, NoteController.store);
router.put('/note/:id', noteAuthorization, NoteController.update);
router.delete('/note/:id', noteAuthorization, NoteController.destroy);

module.exports = router;