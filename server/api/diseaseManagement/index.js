var express = require('express');
var router = express.Router();
const controller = require('./controller');

// list all diseases
router.route('/').get(controller.listDiseases);

//get disease report of user
router.route('/get-report').get(controller.getReports);

module.exports = router;
