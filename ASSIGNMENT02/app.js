var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config/globals');
var mongoose = require('mongoose');
var hbs = require("hbs");
var helpers = require("./helpers");
var passport = require("passport");
var session = require("express-session");
var User = require("./models/user");
var githubStrategy = require("passport-github2").Strategy;

// Middleware
var AuthenticationMiddleware = require("./middlewares/authentication");

// Route Declarations
var guestRouter = require('./routes/guest');
var adminRouter = require('./routes/admin');
var subscriberRouter = require('./routes/subscriber');

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

// Configure Session
app.use(session({
	secret: "flightdeck2024",
	resave: false,
	saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Strategies
passport.use(User.createStrategy());

// GitHub Strategy
passport.use(new githubStrategy(
	{
		clientID: config.Credentials.Github.ClientID,
		clientSecret: config.Credentials.Github.ClientSecret,
		callbackURL: config.Credentials.Github.CallbackUrl
	},
	// callback function
	// profile is github profile
	async (accessToken, refreshToken, profile, done) => {
		// search user by ID
		const user = await User.findOne({ oauthId: profile.id });
		// user exists (returning user)
		if (user) {
			// no need to do anything else
			return done(null, user);
		}
		else {
			// new user so register them in the db
			const newUser = new User({
				name: profile.username,
				email: profile.username,
				oauthId: profile.id,
				oauthProvider: 'Github'
			});
			// add to DB
			const savedUser = await newUser.save();
			// return
			return done(null, savedUser);
		}
	}

));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', guestRouter);
app.use('/admin', AuthenticationMiddleware(["Admin"]), adminRouter);
app.use('/subscriber', AuthenticationMiddleware(["Subscriber"]), subscriberRouter);

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
