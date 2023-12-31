/** @format */

// models/User.js
const mongoose = require("mongoose");
const config = require("config");

const pilotAccessSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created: { type: Number, required: true },
  lastupdated: { type: Number, defualt: 0 },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Number, default: 0 },
  activated: { type: Boolean, required: false, default: false },
  pilottype: { type: String, default: "" },
});

// models/User.js
const MAX_LOGIN_ATTEMPTS = config.get("security.maxLoginAttempts");
const LOCK_TIME = config.get("security.accountLockDuration") * 60 * 1000; // 2 hours in milliseconds

pilotAccessSchema.methods.incrementLoginAttempts = function () {
  this.loginAttempts += 1;
  return this.save();
};

pilotAccessSchema.methods.resetLoginAttempts = function () {
  this.loginAttempts = 0;
  this.save();
};

pilotAccessSchema.methods.isMaxLoginAttemptsExceeded = function () {
  return this.loginAttempts >= MAX_LOGIN_ATTEMPTS;
};

pilotAccessSchema.methods.isLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};

pilotAccessSchema.methods.lockAccount = function () {
  this.lockUntil = Date.now() + LOCK_TIME;
  return this.save();
};

const PilotAccess = mongoose.model("pilotAccess", pilotAccessSchema);

module.exports = PilotAccess;
