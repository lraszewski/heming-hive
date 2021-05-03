const express = require('express');

const app = express();

// start app
const port = 3000;
if (process.env.PORT) {
	port = process.env.PORT;
}
app.listen(port, () => {
	console.log("server is listening on port: " + port);
});