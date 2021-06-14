const mongoose = require('mongoose');
const grid = require('gridfs-stream');

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
		next(error);
	}
}

async function deleteVideo(videoId) {
	const conn = mongoose.connection;
	gfs = new grid(conn.db, mongoose.mongo);
	gfs.collection('videos');
	gfs.remove({ _id: videoId, root: 'videos' }, (error, gridStore) => {
		if (error) {
			return error;
		}
	});
}

module.exports = {
	readVideo,
	deleteVideo
}