const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	username: String,
	password: String
});

module.exports = mongoose.model('User', UserSchema);
