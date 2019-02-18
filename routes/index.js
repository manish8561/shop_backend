
var router = require('express').Router();
/* 
router.use('/api', require('./api')); */
router.use('/', require('./api'));

module.exports = router;