const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.checkNotAuthenticated, (req, res) => {
    res.render('../views/user/register');
});
router.post('/register', userController.checkNotAuthenticated, userController.createUser);

router.get('/login', userController.checkNotAuthenticated, (req, res) => {
	res.render('../views/user/login');
})
router.post('/login', userController.checkNotAuthenticated, userController.login);

router.get('/logout', userController.checkAuthenticated, (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/:userId', userController.checkAuthenticated, userController.grantAccess('readOwn', 'profile'), userController.readUser);
router.post('/:userId', userController.checkAuthenticated, userController.grantAccess('updateOwn', 'profile'), userController.updateUser);

router.get('/delete/:userId', userController.checkAuthenticated, userController.grantAccess('deleteOwn', 'profile'), userController.deleteUser);
 
router.get('/', userController.checkAuthenticated, userController.grantAccess('readAny', 'profile'), userController.readUsers);

module.exports = router;