const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require ("passport-local-mongoose");


let userSchema = Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
            type: String,
            require: true
    },
    email: {
        type: String,
        require: true
    },
});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", userSchema);

module.exports = User;