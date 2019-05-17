import UsersController from "../controllers/usersController";
import Router from 'koa-router';

const router = new Router();

// router.get('/:id', NoteController.get)
router.post('/create',  UsersController.create)
router.get('/all', UsersController.getAll)
router.get('/notes/:id', UsersController.getNotesFromUser)
//router.get('//:id')
//router.delete('/:id', UsersController.deleteNote)
//router.get('/find/title/:id', NoteController.findByTitle)
//router.get('/find/description/:id', NoteController.findByDescription)

module.exports = router.routes();
