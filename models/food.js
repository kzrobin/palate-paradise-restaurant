const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const foodSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]

});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;