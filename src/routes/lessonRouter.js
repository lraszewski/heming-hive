const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const userController = require('../controllers/userController');
const upload = require('../db').upload;

router.get('/create', (req, res) => {
    res.render('../views/lesson/create');
});
router.post('/create', upload.single('file'), lessonController.createLesson);

router.get('/', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'lesson'), lessonController.readLessons);

module.exports = router;