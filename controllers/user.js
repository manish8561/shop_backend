const User = require('../models/user');

//Simple version, without validation or sanitation
let user = {};

user.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
module.exports = user;
