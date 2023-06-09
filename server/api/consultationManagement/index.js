var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.route('/').post(controller.addConsultation);
router.route('/user-data').get(controller.getUserCData);
router.route('/list').get(controller.getRegisteredConsultations);
router.route('/issue-certificate/:id').post(controller.issueCertificate);
router.route('/certificate').post(controller.consultationCertificate);
router.route('/list-certificates').get(controller.getConsultationCertificates);

module.exports = router;
