var express = require("express");
var router = express.Router();
var authLayout = "layouts/auth";
var User = require("../../models/user");
var passport = require("passport");
const nodemailer = require("nodemailer");
var config = require('../../config/globals');

// Configure Nodemailer for Gmail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.Credentials.GmailUser,
    pass: config.Credentials.GmailPass
  }
});

router.get("/login", (req, res, next) => {
	let messages = req.session.messages || [];
	req.session.messages = [];
	res.render("auth/login", { title: "Authenticate", layout: authLayout, messages: messages });
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureMessage: "Invalid Credentials",
}));

router.get("/sign-up", (req, res, next) => {
	res.render("auth/signup", { title: "Sign-up", layout: authLayout });
});

router.post("/sign-up", (req, res, next) => {
	User.register(
		new User({
			name: req.body.name,
			email: req.body.email,
			username: "",
			role: "Subscriber",
		}),
		req.body.password,
		async function (error, newUser) {
			if (error) {
				console.log("Error while signing up: ", error);
				return res.redirect("/auth/sign-up");
			} else {
				req.login(newUser, function (error) {
					if (error) {
						console.log("Error during login: ", error);
					}
				});

				// Send welcome email
				try {
					await transporter.sendMail({
						from: '"FlightDeck Support" <support@flightdeck.com>',
						to: newUser.email, 
						subject: "Welcome to FlightDeck!",
						text: "Welcome to FlightDeck! We're thrilled to have you on board. Get ready to explore and manage your flights like never before.",
						html: `
							<h1>Welcome to FlightDeck!</h1>
							<p>We're thrilled to have you on board.</p>
							<p>Get ready to explore and manage your flights like never before.</p>
							<p>Happy flying!</p>
							<p>The FlightDeck Team</p>
						`,
					});
					console.log("Welcome email sent to:", newUser.email);
				} catch (emailError) {
					console.error("Error sending welcome email:", emailError);
				}

				res.redirect("/");
			}
		}
	);
});

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
	  res.redirect("/");
	});
});

module.exports = router;
