var express = require('express');
var router = express.Router();
const controller = require('./controller');


router.route('/').post(controller.addConsultation);
router.route('/user-data').get(controller.getUserCData)
router.route('/list').get(controller.getRegisteredConsultations);

module.exports = router;
