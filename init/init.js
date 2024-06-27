const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/food.js")
require("dotenv").config();

//database
const atlasDB = process.env.ATLUS_DB;
const mongoDbUrl = "mongodb://127.0.0.1:27017/palateParadise";
async function  main() {
    mongoose.connect(atlasDB);
}
main()
    .then((result) => {
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    })

const initDB = async () => {
    // await Listing.deleteMany({});
    let result = await Listing.insertMany(initData.data);
    console.log(result);
}

initDB();
// console.log(initData.data);