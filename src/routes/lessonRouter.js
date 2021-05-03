const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const upload = require('../db').upload;

router.get('/create', (req, res) => {
    res.render('../views/lesson/create');
});
router.post('/create', upload.single('file'), lessonController.createLesson);

module.exports = router;