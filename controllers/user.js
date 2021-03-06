const User = require("../models/user");
const passport = require("passport");

const { encodeMD5 } = require("../utilities");

//Simple version, without validation or sanitation
let user = {};

user.test = (req, res) => {
  res.send("Greetings from the Test controller!");
};
user.getAll = (req, res, next) => {
  User.find()
    .then(data => {
      if (!data) {
        return res.status(422);
      }
      return res.json({ user: data });
    })
    .catch(next);
};
user.get = (req, res, next) => {
  User.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(422);
      }
      return res.json({ user: data });
    })
    .catch(next);
};
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
      if (!data) {
        return res.status(422);
      }
      return res.json({ user: data,token: user.generateJWT()  });
    });
  }
};

user.login = (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      //user.token = user.generateJWT();
      return res.json({ user: user, token: user.generateJWT() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
};

user.update = (req, res, next) => {
  let /*  query = {
          _id: req.params.id
      }, */
    update = {
      name: req.body.name,
      phone: req.body.phone
    },
    options = {
      upsert: false,
      new: false,
      overwrite: false
    };
    if(req.body.password){
      update.password = encodeMD5(req.body.password);
    }

  User.findByIdAndUpdate(req.params.id, update, options)
    .then(data => {
      return res.json({ user: data });
    })
    .catch(next);
};

user.updatePassword = (req, res, next) => {
  let /*  query = {
          _id: req.params.id
      }, */
    update = {},
    options = {
      upsert: false,
      new: false,
      overwrite: false
    };
    if(req.body.password){
      update.password = encodeMD5(req.body.password);
    }

  User.findByIdAndUpdate(req.params.id, update, options)
    .then(data => {
      return res.json({ user: data });
    })
    .catch(next);
};


user.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(data => {
      if (data === null) {
        return res
          .status(422)
          .json({ success: "NOK", message: "User not found." });
      }
      return res.json({
        success: "OK",
        message: "User is deleted successfully."
      });
    })
    .catch(next);
};

module.exports = user;
