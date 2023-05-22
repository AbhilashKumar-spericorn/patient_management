var express = require('express');
var router = express.Router();

router.use('/contact', require('../api/contactManagement/index'));
router.use('/auth', require('../api/authentication/index'));
router.use('/hospital', require('../api/hospitalManagement/index'));
router.use('/doctor', require('../api/doctorManagement/index'));
router.use('/profile', require('../api/profileManagement/index'));
router.use('/disease', require('../api/diseaseManagement/index'));
router.use('/department', require('../api/departmentManagement/index'));
router.use('/consultation', require('../api/consultationManagement/index'));
router.use('/vaccines', require('../api/vaccineManagement/index'));







module.exports = router;
