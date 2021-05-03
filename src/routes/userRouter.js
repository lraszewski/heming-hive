const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', (req, res) => {
    res.render('../views/user/register');
});
router.post('/register', userController.register);

router.get('/login', (req, res) => {
	res.render('../views/user/login');
})
router.post('/login', userController.login);

module.exports = router;