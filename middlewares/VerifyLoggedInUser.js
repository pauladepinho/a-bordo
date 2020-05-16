const VerifyLoggedInUser = (req, res, next) => {
    // IF USER SESSION IS NOT SET, REDIRECT TO LOGIN
    if (!req.session.user) {
        res.redirect("/login?error=2");
    }
    // IF SESSION IS OK (USER IS ALREADY LOGGED IN), GO AHEAD
    next();
};

module.exports = VerifyLoggedInUser;