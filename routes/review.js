const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controller/review.js");
const { isLoggedIn } = require("../middleware.js");

router.post("/:id", isLoggedIn, reviewController.addReview)
  .delete("/:id/:reviewid", isLoggedIn, reviewController.destroyReview);

module.exports = router;