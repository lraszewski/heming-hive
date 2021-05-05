const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: "user",
		enum: ["user", "student", "administrator"]
	}
});

const User = mongoose.model('user', UserSchema);
module.exports = User;