const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { roles } = require('../roles');

async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

async function createUser(req, res, next) {
	try {
		const { email, password, role } = req.body

		const userExists = await User.findOne({ email });
		if (userExists)  {
			return next(new Error('Account already exists'));
		}

		const hash = await hashPassword(password);
		const user = new User({ 
			email,
			password: hash,
			role: role || "user" 
		});
		await user.save();

		res.redirect('/user/login');
	}
	catch (error) {
		next(error);
	}
}

async function readUser(req, res, next) {
	try {
		const userId = req.params.userId;
		const user = await User.findById(userId);
		if (!user) {
			return next(new Error('User does not exist'));
		}
		res.status(200).json({
			data: user
		});
	}
	catch (error) {
		next(error);
	}
}

async function readUsers(req, res, next) {
	try {
		const users = await User.find({});
		res.status(200).json({
			data: users
		});
	}
	catch (error) {
		next(error);
	}
}

async function updateUser(req, res, next) {
	try {
		const update = req.body
		const userId = req.params.userId;
		await User.findByIdAndUpdate(userId, update);
		const user = await User.findById(userId);
		res.status(200).json({
			data: user,
			message: 'User has been updated'
		});
	}
	catch (error) {
		next(error);
	}
}

async function deleteUser(req, res, next) {
	try {
		const userId = req.params.userId;
		await User.findByIdAndDelete(userId);

		res.status(200).json({
			data: null,
			message: 'User has been deleted'
		});
	}
	catch (error) {
		next(error);
	}
}

async function login(req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	})(req, res, next);
}

function grantAccess(action, resource) {
	return async (req, res, next) => {
		try {
			const permission = roles.can(req.user.role)[action](resource);
			if (!permission.granted) {
				return res.status(401).json({
					error: "You don't have enough permission to perform this action"
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

module.exports = {
	createUser,
	readUser,
	readUsers,
	updateUser,
	deleteUser,
	login,
	grantAccess,
	checkAuthenticated,
	checkNotAuthenticated
}