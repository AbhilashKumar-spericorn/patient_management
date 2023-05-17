var express = require('express');
var router = express.Router();
const controller = require('./controller');

// router.route('/view').get(controller.viewProfile);

router.route('/change-password').post(controller.changePassword);

router.route('/report-disease').post(controller.reportDisease);

module.exports = router;
