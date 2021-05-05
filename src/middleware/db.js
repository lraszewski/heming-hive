const dotenv = require('dotenv');
const mongoose = require("mongoose");
const grid = require('gridfs-stream');
const mgfs = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');

grid.mongo = mongoose.mongo

mongoose.connect(
	process.env.CONNECTION_STRING,
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true 
	}
);

const db = mongoose.connection;

db.on("error", err => {
	console.error(err);
	process.exit(1);
})

let gfs
db.once("open", async () => {
	gfs = grid(db.db);
	gfs.collection('videos');
	console.log("db connection started on " + db.host + ":" + db.port);
})

const storage = new mgfs({
	db: db,
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