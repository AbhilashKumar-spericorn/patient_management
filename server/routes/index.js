var express = require('express');
var router = express.Router();

router.use('/contact', require('../api/contactManagement/index'));
router.use('/auth', require('../api/authentication/index'));
router.use('/hospital', require('../api/hospitalManagement/index'));
router.use('/doctor', require('../api/doctorManagement/index'));



module.exports = router;
