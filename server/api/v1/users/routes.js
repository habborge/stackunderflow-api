const router = require('express').Router();

const controller = require('./controller');
const { auth } = require('./../auth');

router.param('id', controller.id);

router.route('/').get(
  // auth,
  controller.all,
);

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
