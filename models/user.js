const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    balance: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'active' },
    ip: { type: String, default: '0.0.0.0' },
    phone: { type: String }
}, { timestamps: true });


// Export the model
module.exports = mongoose.model('User', UserSchema);