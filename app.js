const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Food = require("./models/food.js");
const User = require("./models/user.js");

const foods = require("./routes/food.js");
const user = require("./routes/user.js");


const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public"))); // Corrected line


//database
async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/palateParadise");
};
main()
    .then((result) => {
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    })


//root path
app.get("/", (req, res) => {
    res.send("root path")
});

//session Options
const sessionOptions = {
    secret: "superKzRobin",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 3600* 1000,
        maxage: 7 * 24 * 3600* 1000,
    }
}
//using session
app.use(session(sessionOptions));
//using flash
app.use(flash());

//uisng passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//local variables
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//user
app.use("/home/user", user); 

//food router 
app.use("/home", foods);

//user login 
app.get("/home/login", (req, res)=> {
    res.render("./user/login.ejs");
})

app.post("/home/login", async (req, res) => {
    console.log(req.body);
    let { mail , password } = req.body.user;
    let presentUser = await NewUser.find({mail: mail, pass: password});
    // console.log(presentUser.length);
    if(presentUser.length>0)
        res.send("User loged in");
    else {
        res.send("invalid user");
    }
})


// show route
app.get("/home/:id", async (req, res) => {
    let { id } = req.params;
    let item = await Food.findById(id);
    res.render("./food/show.ejs", { item });

});


//localhost
const port = 8080;
app.listen(port, () => {
    console.log(`Sarver is running on port ${port}`);
});