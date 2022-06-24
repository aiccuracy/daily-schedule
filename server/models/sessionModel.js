const mongoose = require('mongoose');

let sessionSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true},
    isLogined: { type: Boolean, required: false}
})

module.exports = mongoose.model('sessions', sessionSchema);