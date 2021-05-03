const dotenv = require('dotenv');
const mongoose = require("mongoose");

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

db.once("open", async () => {
	console.log("db connection started on " + db.host + ":" + db.port);
})

//require("./models/*");