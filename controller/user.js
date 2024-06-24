const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("./user/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
  try {
    let { firstName, lastName, email, username, password } = req.body.newUser;
    const newUser = new User({ firstName, lastName, email, username });
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanterlust");
      res.redirect("/");
    });
  }
  catch (err) {
    req.flash("error", err.message);
    req.redirect("/user/signup");
  };
}

module.exports.renderLoginForm = (req, res) => {
  res.render("./user/login.ejs");
}

module.exports.login = async (req, res) => {
  req.flash("success", "You are logged in.");
  res.redirect("/");
}

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    };
    req.flash("success", "you are logged out");
    res.redirect("/");
  });
}