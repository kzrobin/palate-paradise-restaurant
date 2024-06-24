module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in");
        req.session.redirectUrl = req.originalUrl;
        return res.redirect("/user/login");
    }
    next();
};

