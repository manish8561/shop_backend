const User = require('../models/user');
const {
    encodeMD5,
} = require('../utilities');

//Simple version, without validation or sanitation
let user = {};

user.test = (req, res) => {
    res.send('Greetings from the Test controller!');
};
user.getAll = (req, res, next) => {
    User.find().then(data => {
        if (!data) { return res.status(422); }
        return res.json({ user: data });
    }).catch(next);
}
/* adding the user */
user.add = (req, res, next) => {
    if (req.body) {
        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = encodeMD5(req.body.password);
        user.phone = req.body.phone;
        user.save((err, data) => {
            if (err) {
                return res.json(err);
            }
            if (!data) { return res.status(422); }
            return res.json({ user: data });
        });
    }
}

module.exports = user;
