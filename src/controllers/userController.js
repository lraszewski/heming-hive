const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../roles');

async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

async function validatePassword(password, hash) {
	return await bcrypt.compare(password, hash);
}

async function createUser(req, res, next) {
	try {
		const { email, password, role } = req.body
		const hash = await hashPassword(password);
		const user = new User({ 
			email,
			password: hash,
			role: role || "user" 
		});

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
		user.token = token;
		await user.save();

		res.header('user-token', token);
		res.redirect('/');
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
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user)  {
			return next(new Error('Email does not exist'));
		}

		const validPassword = await validatePassword(password, user.password);
		if (!validPassword) {
			return next(new Error('Password is not correct'));
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
		await User.findByIdAndUpdate(user._id, { token });

		res.header('user-token', token);
		res.redirect('/');
	}
	catch (error) {
		next(error);
	}
}

function grantAccess(action, resource) {
	return async (req, res, next) => {
		try {
			verifyToken(req, res, next);
			const permission = roles.can(req.user.role)[action](resource);
			if (!permission.granted) {
				return res.status(401).json({
					error: "You do not have the required permissions to perform this action"
				});
			}
			next();
		}
		catch (error) {
			next(error);
		}
	}
}

async function allowIfLoggedIn(req, res, next) {
	try {
		verifyToken(req, res, next);
		const user = req.user
		if (!user) {
			return res.status(401).json({
				error: "You need to be logged in to access this route"
			});
		}
		next();
	}
	catch (error) {
		next(error);
	}
}

async function verifyToken(req, res, next) {

	const token = req.header('user-token'); 
	if (!token) {
		req.user = null
	}

	try {
		const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);

		if (exp < Date.now().valueOf() / 1000) {
			return res.status(401).json({
				error: "JWT token has expired, please login to obtain a new one"
			});
		}
		req.user = User.findById(userId);
		next();
	} catch(err) {
		res.status(400).send('Invalid Token');
	}
}

module.exports = {
	createUser,
	readUser,
	readUsers,
	updateUser,
	deleteUser,
	login,
	grantAccess,
	allowIfLoggedIn,
	verifyToken
}