var express = require('express');
var router = express.Router();
const controller = require('./controller');


router.route('/').post(controller.addConsultation);
// router.get('/', getDepartmentHospitalDoctor);

module.exports = router;
