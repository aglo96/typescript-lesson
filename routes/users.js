const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/users')

router.get('/', Ctrl.hello)    // /v1/users
module.exports = router.routes()

