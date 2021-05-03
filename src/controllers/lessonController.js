const Lesson = require('../models/lessonModel');
const db = require('../db');

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

	}
	catch (error) {
		next(error);
	}
}

async function updateLesson(req, res, next) {
	try {

	}
	catch (error) {
		next(error);
	}
}

async function deleteLesson(req, res, next) {
	try {

	}
	catch (error) {
		next(error);
	}
}

module.exports = {
	createLesson,
	readLesson,
	updateLesson,
	deleteLesson
}