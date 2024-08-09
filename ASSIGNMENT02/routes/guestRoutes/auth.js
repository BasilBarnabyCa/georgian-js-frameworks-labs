var express = require("express");
var router = express.Router();
var authLayout = "layouts/auth";
var User = require("../../models/user");
var passport = require("passport");

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
		function (error, newUser) {
			if (error) {
				console.log("Error while signing up: ", error);
				return res.redirect("/auth/sign-up");
			} else {
				req.login(newUser, function (error) {
					// TODO: Decide where to redirect after sign-up
				});
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
