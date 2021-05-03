const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', (req, res) => {
    res.render('../views/user/register');
});
router.post('/register', userController.createUser);

router.get('/login', (req, res) => {
	res.render('../views/user/login');
})
router.post('/login', userController.login);

router.get('/:userId', userController.allowIfLoggedIn, userController.readUser);
router.put('/:userId', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
router.delete('/:userId', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
 
router.get('/', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.readUsers);

module.exports = router;