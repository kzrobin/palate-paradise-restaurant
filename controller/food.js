const Food = require("../models/food.js");

module.exports.index = async (req, res) => {
  let allItems = await Food.find()
  res.render("./food/index.ejs", { allItems });
}

module.exports.item = async (req, res) => {
  let { id } = req.params;
  const item = await Food.findById(id).populate({
    path: "reviews",
    populate: ({
      path: "author",
    })
  });
  res.render("./food/show.ejs", { item });
}

module.exports.type = async (req, res) => {
  let { type } = req.params;
  let allItems = await Food.find({ type: type })
  res.render("./food/items.ejs", { allItems, type });
}

module.exports.search = async (req, res) => {
  let searchString = req.query.q;
  let allItems = await Food.find({
    $or: [
      { title: { $regex: searchString, $options: "i" } },
      { description: { $regex: searchString, $options: "i" } },
    ],
  });
  res.render("./food/index.ejs", { allItems });
}