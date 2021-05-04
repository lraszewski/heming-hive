const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const User = require('../src/models/userModel');

dotenv.config();
require('./db.js');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
	if (req.headers["user-token"]) {
		const accessToken = req.headers["user-token"];
		const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);

		if (exp < Date.now().valueOf() / 1000) { 
			return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
		} 
	 	res.locals.loggedInUser = await User.findById(userId); 
		next(); 
	} else { 
		next(); 
	}
});

const userRouter = require('./routes/userRouter');
const lessonRouter = require('./routes/lessonRouter');

app.use('/user', userRouter);
app.use('/lesson', lessonRouter);
app.get('/', (req, res) => {
	res.render('index');
})

const port = process.env.PORT;
app.listen(port, () => {
	console.log("server is listening on port " + port);
});