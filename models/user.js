const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, unique:true },
    password: { type: String, default:null },
    price: { type: Number, required: true },
    status: { type: String, default: 'active' },
    ip: { type: String, default: '0.0.0.0' }
}, { timestamps: true });


// Export the model
module.exports = mongoose.model('User', UserSchema);