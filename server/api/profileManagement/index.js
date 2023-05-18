var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.route('/data').get(controller.viewProfile);

router.route('/basic-data').get(controller.getBasicData).patch(controller.updateBasicProfile);
router.route('/med-data').get(controller.getMedData).patch(controller.updateMedData)

router.route('/change-password').post(controller.changePassword);

router.route('/report-disease').post(controller.reportDisease);

module.exports = router;

