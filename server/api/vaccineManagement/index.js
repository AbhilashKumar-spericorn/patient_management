var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.route('/').post(controller.addVaccination);
router.route('/').get(controller.getAllVaccines);
router.route('/get-data').get(controller.getUserData);
router.route('/list').get(controller.getRegisteredVaccinations);

module.exports = router;
