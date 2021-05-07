const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const userController = require('../controllers/userController');
const upload = require('../middleware/db').upload;

router.get('/create', userController.checkAuthenticated, (req, res) => {
    res.render('../views/lesson/create');
});
router.post('/create', userController.checkAuthenticated, upload.single('file'), lessonController.createLesson);

router.get('/', userController.checkAuthenticated, userController.grantAccess('readAny', 'lesson'), lessonController.readLessons);

router.get('/:lessonId', userController.checkAuthenticated, userController.grantAccess('readAny', 'lesson'), lessonController.readLesson);

module.exports = router;