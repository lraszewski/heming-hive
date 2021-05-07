const Lesson = require('../models/lessonModel');

async function createLesson(req, res, next) {
	try {
		const lesson = new Lesson({
			title: req.body.title,
			description: req.body.description,
			video: req.file.id
		});
		await lesson.save();
		res.render('../views/lesson/create');
	}
	catch (error) {
		next(error);
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
		next(error);
	}
}

async function readLessons(req, res, next) {
	try {
		const lessons = await Lesson.find({});
		res.render('../views/lesson/lessons', { lessons: lessons });
	}
	catch (error) {
		next(error);
	}
}

async function updateLesson(req, res, next) {
	try {
		const update = req.body
		const lessonId = req.params.lessonId;
		await Lesson.findByIdAndUpdate(lessonId, update);
		const lesson = await Lesson.findById(lessonId);
		res.status(200).json({
			data: lesson,
			message: 'Lesson has been updated'
		});
	}
	catch (error) {
		next(error);
	}
}

async function deleteLesson(req, res, next) {
	try {
		const lessonId = req.params.lessonId;
		await Lesson.findByIdAndDelete(lessonId);

		res.status(200).json({
			data: null,
			message: 'Lesson has been deleted'
		});
	}
	catch (error) {
		next(error);
	}
}

module.exports = {
	createLesson,
	readLesson,
	readLessons,
	updateLesson,
	deleteLesson
}