const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

var secret = require('../config/config').secret;
const { encodeMD5 } = require("../utilities");

let UserSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    balance: { type: Number, required: true, default: 0 },
    status: { type: String, default: "active" },
    ip: { type: String, default: "0.0.0.0" },
    phone: { type: String }
  },
  { timestamps: true }
);

UserSchema.methods.validPassword = function(password) {
  var hash = encodeMD5(password);
  console.log(hash, password, this.password);
  return this.password === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 7);

  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};
// Export the model
module.exports = mongoose.model("User", UserSchema);
