import NoteController from "../controllers/notesController";
import Router from 'koa-router';

const router = new Router();

// router.get('/:id', NoteController.get)
router.post('/create',  NoteController.create)
router.get('/all', NoteController.getAll)
//router.get('/all/:id', NoteController.getNotesFromUser)
router.delete('/:id', NoteController.deleteNote)
router.get('/find/title/:id', NoteController.findByTitle)
router.get('/find/description/:id', NoteController.findByDescription)

module.exports = router.routes();


