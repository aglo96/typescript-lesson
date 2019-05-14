import NoteController from "../controllers/notesController";
import Router from 'koa-router';

const router = new Router();

router.get('/get', NoteController.get)
router.get('/get1', NoteController.get1)
router.get('/get2', NoteController.get2)
router.get('/get3', NoteController.get3)

router.post('/create',  NoteController.create)
module.exports = router.routes();