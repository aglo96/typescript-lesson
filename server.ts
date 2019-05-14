const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const mongoose = require('mongoose');


const app = new Koa()
const router = new Router()

app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())

// General error handler.
app.use(async (ctx: any, next: any) => {
  try{
    await next()
  }
  catch (err) {
    ctx.status = 400
     ctx.body = {
          "code": 400,
          "error_message": err,
          "input": ctx.request.body
     }
  }
})


app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err: Error, ctx:any) {
    ctx.throw('body parse error', err)
  }
}))

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.use(require('koa-static')('./build'));
mongoose.connect('mongodb+srv://awesomeag:97390636@cluster0-88ugf.mongodb.net/test?retryWrites=true')


module.exports = app
