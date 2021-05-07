const dotenv = require('dotenv');
const mongoose = require("mongoose");
const grid = require('gridfs-stream');
const mgfs = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');

mongoose.connect(
	process.env.CONNECTION_STRING,
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true 
	}
);

const conn = mongoose.connection;

conn.on("error", err => {
	console.error(err);
	process.exit(1);
})

conn.once("open", async () => {
	console.log("db connection started on " + conn.host + ":" + conn.port);
})

const storage = new mgfs({
	db: conn,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'videos'
				};
				resolve(fileInfo);
			})
		})
	}
});
const upload = multer({ storage });

exports.upload = upload;