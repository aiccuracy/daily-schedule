const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const scheduleSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: false},
    task: { type: String, required: true, unique: false },
    date: { type: Date, required: true, unique: false },
    scheduleNum: { type: Number, required: true, unique: true},
    private: { type: Boolean, required: true, unique: false}
});

scheduleSchema.plugin(autoIncrement.plugin, {
    model: 'schedules',
    field: 'scheduleNum',
    startAt: 1,
    increment: 1
});

module.exports = mongoose.model('schedules', scheduleSchema);
