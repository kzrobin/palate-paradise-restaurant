const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");
//user signUp
router.get("/signup", (req, res) => {
    res.render("./user/signup.ejs");

});
router.post("/signup", async (req, res, next) => {
    try {
        let { firstName, lastName, email, username, password } = req.body.newUser;
        const newUser = new User({ firstName, lastName, email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanterlust");
            res.redirect("/home");
        });
    }
    catch(err){
        req.flash("error", err.message);
        req.redirect("/home/user/signup");
    };


});
//user login
router.get("/login", (req, res) => {
    res.render("./user/login.ejs");
})

router.post("/login",
    passport.authenticate("local", { failureRedirect: "/home/user/login", failureFlash: true }),
    async (req, res) => {
        req.flash("success", "You are logged in.");
        res.redirect("/home");
});

router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        };
        req.flash("success", "you are logged out");
        res.redirect("/home");
    });
})

module.exports = router;