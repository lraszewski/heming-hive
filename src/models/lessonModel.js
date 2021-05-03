const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	video: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "videos.files",
		required: true
	}
});

const Lesson = mongoose.model('lesson', LessonSchema);
module.exports = Lesson;