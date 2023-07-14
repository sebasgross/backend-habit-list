const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitListSchema = new Schema({
    list: [Object],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

module.exports = mongoose.model('Habit-List', habitListSchema);