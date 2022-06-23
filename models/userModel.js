const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

let userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    id: { type: String, required: true, unique: true},
    pw: { type: String, required: true, unique: false},
    userNum: { type: Number, required: true, unique: true }
})

userSchema.plugin(autoIncrement.plugin, {
    model: 'users',
    field: 'userNum',
    startAt: 1,
    increment: 1
});

module.exports = mongoose.model('users', userSchema);