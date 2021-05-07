const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');

router.get('/:videoId', userController.checkAuthenticated, userController.grantAccess('readAny', 'lesson'), videoController.readVideo);

module.exports = router;