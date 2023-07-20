const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new Schema({
  username: String,
  habitList: {
    type: Schema.Types.ObjectId,
    ref: "HabitList"
  },
  oldHabitLists: Array
}, { timestamps: true })

userSchema.plugin(passportLocalMongoose, { usernameField: "username" })

module.exports = mongoose.model('User', userSchema)