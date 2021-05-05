const localStrategy = require('passport-local').Strategy
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require("passport");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

async function authenticateUser(email, password, done) {
	const user = await User.findOne({ email });
	if (!user) {
		return done(null, false, { message: 'User not found' });
	}
	try {
		if (await bcrypt.compare(password, user.password)) {
			return done(null, user);
		} 
		else {
			return done(null, false, { message: 'Incorrect password' });
		}
	} 
	catch (error) {
		return done(error);
	}
}

passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));

module.exports = passport;