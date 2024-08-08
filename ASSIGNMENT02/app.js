var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config/globals');
var mongoose = require('mongoose');
var hbs = require("hbs");
var helpers = require("./helpers");

// Route Declarations
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

// Connect to MongoDB
mongoose
	.connect(config.ConnectionStrings.MongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((message) => console.log("Connected Successfully!"))
	.catch((error) => console.log(`Error while connecting: ${error}`));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/users', usersRouter);

// Helpers
helpers.getHelpers();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
