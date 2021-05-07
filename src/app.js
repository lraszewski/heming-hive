const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('./middleware/passport');

const app = express();

dotenv.config();
require('./middleware/db.js');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const userRouter = require('./routes/userRouter');
const lessonRouter = require('./routes/lessonRouter');
const videoRouter = require('./routes/videoRouter');
const homeRouter = require('./routes/homeRouter');

app.use('/user', userRouter);
app.use('/lesson', lessonRouter);
app.use('/video', videoRouter);
app.use('/', homeRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log("server is listening on port " + port);
});