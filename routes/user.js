const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");
const userController = require("../controller/user.js");

//user signUp
router.get("/signup", userController.renderSignupForm)
  .post("/signup",);
//user login
router.get("/login",userController.renderLoginForm)
  .post(
    "/login",
    passport.authenticate("local", 
    { failureRedirect: "/user/login", failureFlash: true }), 
    userController.login
  )
  .get("/logout", userController.logout);

module.exports = router;