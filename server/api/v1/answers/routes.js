const router = require('express').Router();

const controller = require('./controller');

const { auth } = require('./../auth');

router.param('id', controller.id);

router
  .route('/')
  .post(auth, controller.create)
  .get(controller.all);

router
  .route('/:id')
  .get(controller.read)
  .put(auth, controller.update)
  .delete(auth, controller.delete);

module.exports = router;
