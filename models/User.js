// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  activated:{type: Boolean, required:false, default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
