const { Router } = require('express');

const NoteController = require('../controllers/NoteController');
const ValidateNote = require('../validators/NoteValidator');
const { authentication, noteAuthorization } = require('../middlewares/auth');

const router = Router();

router.use(authentication);
router.get('/note', NoteController.list);
router.get('/note/:id', noteAuthorization, NoteController.show);
router.post('/note', ValidateNote, NoteController.store);
router.put('/note/:id', noteAuthorization, ValidateNote, NoteController.update);
router.delete('/note/:id', noteAuthorization, NoteController.destroy);

module.exports = router;
