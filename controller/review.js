const Food = require("../models/food.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

module.exports.addReview = async (req, res) => {
  let { id } = req.params
  let item = await Food.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  item.reviews.push(newReview);
  newReview = await newReview.save();
  item = await item.save();
  req.flash("success", "New Review Added!");
  res.redirect(`/item/${id}`);
}

module.exports.destroyReview = async (req, res) => {
  let { id, reviewid } = req.params;
  let review = await Review.findById(reviewid);
  if (req.user && req.user._id.equals(review.author)) {
    await Food.findByIdAndUpdate(id, {
      $pull: { reviews: { _id: reviewid } }
    });
    await Review.findByIdAndDelete(reviewid);
  }
  else {
    req.flash("error", "error occured");
    return res.redirect("/");
  }
  req.flash("success", "Review deleted!");
  res.redirect(`/item/${id}`);
}
