var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.route('/').get(controller.getAllHospitals);
router.route('/list-patients').get(controller.getAllPatients)

module.exports = router;
