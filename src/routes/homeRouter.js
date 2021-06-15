const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const errorController = require('../controllers/errorController.js');

router.get('/', userController.checkAuthentication, (req, res) => {
	res.render('../views/home/index');
});

router.get('*', (req, res) => {
	try {
		res.status(404);
		throw new Error('Page not found');
	}
	catch (error) {
		errorController.handleError(error, req, res, undefined);
	}
});

module.exports = router;