const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { roles } = require('../middleware/roles');
const { userValidation } = require('../middleware/validation');

async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

async function createUser(req, res, next) {
	try {
		const { email, password, passwordConfirmation, role } = req.body
		
		if (password != passwordConfirmation) {
			res.locals.error = { message: "Passwords do not match" };
			return res.status(400).render('../views/user/register');
		}

		const {error} = userValidation({ email: email, password: password, role: role });
		if (error) {
			res.locals.error = { message: error.details[0].message }
			return res.status(400).render('../views/user/register');
		}

		const hash = await hashPassword(password);
		const user = new User({ 
			email,
			password: hash,
			role: "user" 
		});
		await user.save();

		return res.redirect('/user/login');

	}
	catch (error) {
		next(error);
	}
}

async function readUser(req, res, next) {
	try {
		// use rUser to avoid collision with user property set by passport
		const userId = req.params.userId;
		const rUser = await User.findById(userId);
		if (!rUser) {
			return next(new Error('User does not exist'));
		}
		res.render('../views/user/profile', { rUser: rUser });
	}
	catch (error) {
		next(error);
	}
}

async function readUsers(req, res, next) {
	try {
		const rUsers = await User.find({});
		res.render('../views/user/users', { rUsers: rUsers });
	}
	catch (error) {
		next(error);
	}
}

async function updateUser(req, res, next) {
	try {
		const userId = req.params.userId;
		const rUser = await User.findById(userId);

		const { email, password, passwordConfirmation } = req.body;
		const permission = roles.can(req.user.role)["updateOwn"]("role");
		var role = rUser.role;
		if (permission.granted) {
			role = req.body.role;
		}

		if (password != passwordConfirmation) {
			res.locals.error = { message: "Passwords do not match" };
			return res.status(400).render('../views/user/profile', { rUser: rUser });
		}

		const { error } = userValidation({ email: email, password: password, role: role });
		if (error) {
			res.locals.error = { message: error.details[0].message }
			return res.status(400).render('../views/user/profile', { rUser: rUser });
		}
		const hash = await hashPassword(password);
		rUser.email = email;
		rUser.password = hash;
		rUser.role = role;
		await rUser.save();
		return res.redirect('/user/' + rUser.id);
	}
	catch (error) {
		next(error);
	}
}

async function deleteUser(req, res, next) {
	try {
		const userId = req.params.userId;
		const user = req.user;
		await User.findByIdAndDelete(userId);
		if (user.id == userId) {
			return res.redirect('/user/logout');
		}
		else {
			return res.redirect('/user/');
		}
	}
	catch (error) {
		next(error);
	}
}

async function login(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.locals.error = { message: "Invalid username or password" }
			return res.status(401).render('../views/user/login');
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.redirect('/');
		});
	})(req, res, next);
}

function grantAccess(action, resource) {
	return async (req, res, next) => {
		try {
			const permission = roles.can(req.user.role)[action](resource);
			var granted = permission.granted;
			if (req.user.role != "administrator" && typeof req.params.userId !== "undefined") {
				if (req.user.id != req.params.userId) {
					granted = false;
				}
			}
			if (!granted) {
				return res.status(401).json({
					error: "You do not have enough permission to perform this action"
				});
			}
			next()
		} catch (error) {
			next(error)
		}
	}
}

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
		res.locals.login = req.session.passport;
		return next();
	}
	res.redirect('/user/login');
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	return next();
}

function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
		res.locals.login = req.session.passport;
		return next();
	}
	return next();
}

module.exports = {
	createUser,
	readUser,
	readUsers,
	updateUser,
	deleteUser,
	login,
	grantAccess,
	checkAuthenticated,
	checkNotAuthenticated,
	checkAuthentication
}