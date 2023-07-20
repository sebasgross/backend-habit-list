const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitListSchema = new Schema({
    list: [Object],
}, {timestamps: true})

module.exports = mongoose.model('Habit-List', habitListSchema);