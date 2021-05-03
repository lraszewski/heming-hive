const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();
require('./db.js');
app.set('view engine', 'ejs');

const userRouter = require('./routes/userRouter');

app.use('/', userRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log("server is listening on port " + port);
});