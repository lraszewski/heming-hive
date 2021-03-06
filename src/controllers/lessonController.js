const Lesson = require('../models/lessonModel');
const videoController = require('./videoController.js');
const errorController = require('./errorController.js');

async function createLesson(req, res, next) {
	try {
		const lesson = new Lesson({
			title: req.body.title,
			description: req.body.description,
			video: req.file.id
		});
		var lessonId
		await lesson.save().then(saved => {
			lessonId = saved.id;
		});
		res.redirect('/lesson/' + lessonId);
	}
	catch (error) {
		errorController.handleError(error, req, res, next);
	}
}

async function readLesson(req, res, next) {
	try {
		const lessonId = req.params.lessonId;
		const lesson = await Lesson.findById(lessonId);
		if (!lesson) {
			return next(new Error('Lesson does not exist'));
		}
		res.render('../views/lesson/lesson', { lesson: lesson });
	}
	catch (error) {
		errorController.handleError(error, req, res, next);
	}
}

async function readLessons(req, res, next) {
	try {
		const lessons = await Lesson.find({});
		res.render('../views/lesson/lessons', { lessons: lessons });
	}
	catch (error) {
		errorController.handleError(error, req, res, next);
	}
}

async function deleteLesson(req, res, next) {
	try {
		const lessonId = req.params.lessonId;
		const lesson = await Lesson.findById(lessonId);
		const videoId = lesson.video;
		const error = await videoController.deleteVideo(videoId);
		if (error) {
			throw new Error(error);
		}
		await Lesson.findByIdAndDelete(lessonId);
		res.redirect('/lesson/');
	}
	catch (error) {
		errorController.handleError(error, req, res, next);
	}
}

module.exports = {
	createLesson,
	readLesson,
	readLessons,
	deleteLesson
}
