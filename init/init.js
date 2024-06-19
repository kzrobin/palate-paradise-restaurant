const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/food.js")


//database
async function  main() {
    mongoose.connect("mongodb://127.0.0.1:27017/palateParadise");
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