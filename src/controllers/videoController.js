const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const errorController = require('./errorController.js');

async function readVideo(req, res, next) {
	try {
		const videoId = req.params.videoId;
		const conn = mongoose.connection;

		gfs = new grid(conn.db, mongoose.mongo);
		gfs.collection('videos');
		const readstream = await gfs.createReadStream({
			_id: videoId,
		});

		readstream.pipe(res);
	}
	catch (error) {
		errorController.handleError(error, req, res, next);
	}
}

async function deleteVideo(videoId) {
	try {
		const conn = mongoose.connection;
		gfs = new grid(conn.db, mongoose.mongo);
		gfs.collection('videos');
		gfs.remove({ _id: videoId, root: 'videos' }, (error, gridStore) => {
			if (error) {
				throw error;
			}
		});
	}
	catch (error) {
		errorController.handleError(error, req, res, next);
	}
}

module.exports = {
	readVideo,
	deleteVideo
}