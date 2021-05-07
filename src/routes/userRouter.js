const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.checkNotAuthenticated, (req, res) => {
    res.render('../views/user/register');
});
router.post('/register', userController.createUser);

router.get('/login', userController.checkNotAuthenticated, (req, res) => {
	res.render('../views/user/login');
})
router.post('/login', userController.login);

router.get('/logout', userController.checkAuthenticated, (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/:userId', userController.checkAuthenticated, userController.readUser);
router.put('/:userId', userController.checkAuthenticated, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
router.delete('/:userId', userController.checkAuthenticated, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
 
router.get('/', userController.checkAuthenticated, userController.grantAccess('readAny', 'profile'), userController.readUsers);

module.exports = router;