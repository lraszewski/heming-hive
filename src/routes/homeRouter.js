const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.checkAuthentication, (req, res) => {
	res.render('../views/home/index');
});

module.exports = router;