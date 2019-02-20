const express = require('express');
const router = express.Router();
var auth = require('../auth');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const user = require('../../controllers/user');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user.test);
router.get('/user/get', auth.required, user.getAll);
router.post('/user/add', user.add);
router.post('/user/login', user.login);
router.put('/user/update/:id', user.update);
router.delete('/user/delete/:id',user.deleteUser);
module.exports = router;