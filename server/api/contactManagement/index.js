var express = require('express');
var router = express.Router();
const controller = require('./controller');
const validate = require('./validator');

router.route('/').post(validate.contactValidate, controller.setContact);
router.route('/feedback').get(controller.getUserMessages);
router
  .route('/feedback/:id')
  .get(controller.getMsgToRead)


module.exports = router;
