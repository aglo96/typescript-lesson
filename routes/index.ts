import Router from 'koa-router';

module.exports = (router: Router) => {
  router.prefix('/v1');
  router.use('/todos',require('./todos'))
  router.use('/notes', require('./notesRoutes'))
} 
