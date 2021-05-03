const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();
const db = require('./db.js');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/userRouter');
const lessonRouter = require('./routes/lessonRouter');

app.use('/user', userRouter);
app.use('/lesson', lessonRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log("server is listening on port " + port);
});