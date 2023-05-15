var express = require('express');
var router = express.Router();


router.use('/contact', require('../api/contactManagement/index'));

module.exports = router;
