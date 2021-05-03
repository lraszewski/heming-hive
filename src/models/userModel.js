const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
	},
	token: {
		type: String,
		required: false
	}
});

const User = mongoose.model('user', UserSchema);
module.exports = User;