const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const foodSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        url: {
            type: String,
            default: "https://st3.depositphotos.com/1194063/14181/i/450/depositphotos_141815838-stock-photo-various-herbs-and-spices.jpg",
            set: (v) => v || "https://st3.depositphotos.com/1194063/14181/i/450/depositphotos_141815838-stock-photo-various-herbs-and-spices.jpg"
        }
    },
    type: {
        type: String,
        require: true,
    }

});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;