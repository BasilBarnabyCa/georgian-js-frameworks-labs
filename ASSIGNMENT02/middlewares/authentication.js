// Custom Middleware function to check for an authenticated user and their role
function AuthenticationMiddleware(requiredRoles) {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            if (requiredRoles.includes("Admin") || requiredRoles.includes("Agent")) {
                // Trying to access /admin or /agent when not logged in
                return res.status(404).send("Page not found");
            } else if (requiredRoles.includes("Subscriber")) {
                // Trying to access /subscriber when not logged in
                return res.redirect("/login");
            }
        } else {
            const userRole = req.user.role;

            if (requiredRoles.includes(userRole)) {
                // User has the correct role, allow access
                return next();
            }

            if (userRole === "Subscriber") {
                if (requiredRoles.includes("Admin") || requiredRoles.includes("Agent")) {
                    // Subscriber trying to access /admin or /agent
                    return res.status(404).send("Page not found");
                }
            } else if (userRole === "Admin" || userRole === "Agent") {
                if (requiredRoles.includes("Subscriber")) {
                    // Admin or Agent trying to access /subscriber
                    req.logout((err) => {
                        if (err) {
                            return next(err);
                        }
                        return res.redirect("/login");
                    });
                } else {
                    // Admin or Agent trying to access /admin or /agent but not permitted
                    return res.status(404).send("Page not found");
                }
            }
        }
    };
}

module.exports = AuthenticationMiddleware;
